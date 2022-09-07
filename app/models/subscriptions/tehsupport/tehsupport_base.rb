# frozen_string_literal: true

# == Schema Information
#
# Table name: subscriptions
#
#  id           :bigint           not null, primary key
#  credit_limit :integer
#  ended_at     :datetime
#  jsondata     :json
#  settings     :json
#  started_at   :datetime
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  client_id    :bigint
#  tariff_id    :bigint
#
# Indexes
#
#  index_subscriptions_on_client_id  (client_id)
#  index_subscriptions_on_tariff_id  (tariff_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (tariff_id => tariffs.id)
#
# Техподдержка базовая
class ::Subscriptions::Tehsupport::TehsupportBase < Subscription
  after_save :check_or_create_notification
  after_save :check_has_active_tehsupport?
  after_save :add_tm_hours_to_client

  JSONDATA_JSON_SCHEMA = Pathname.new(
    Rails.root.join(
      'config', 'schemas', 'subscriptions', 'tehsupport.json'
    )
  )

  JSONDATA_SINGULAR_JSON_SCHEMA = Pathname.new(
    Rails.root.join(
      'config', 'schemas', 'subscriptions', 'tehsupport_singular.json'
    )
  )

  JSONDATA_URGENT_JSON_SCHEMA = Pathname.new(
    Rails.root.join(
      'config', 'schemas', 'subscriptions', 'tehsupport_urgent.json'
    )
  )

  validates :started_at, presence: true
  validates :ended_at, presence: true, if: :tariff_periodic?
  validate :ended_at_check, if: :tariff_periodic?
  validates :jsondata, presence: true, json: { schema: JSONDATA_JSON_SCHEMA }, if: :new_tariff?
  validates :jsondata, presence: true, json: { schema: JSONDATA_SINGULAR_JSON_SCHEMA }, if: :singular_tariff?
  validates :jsondata, presence: true, json: { schema: JSONDATA_URGENT_JSON_SCHEMA }, if: :urgent_tariff?

  # before_create :set_hours!, if: :new_tariff?
  # before_create :set_hours_from_tariff!, if: :non_new_tariffs?

  HOUR = 60

  aasm column: 'state' do
    state :state_new, initial: true
    state :state_active
    state :state_limited
    state :state_suspend
    state :state_closed
    state :state_renewal
    state :state_continue

    event :newed do
      transitions from: %i[state_continue], to: :state_new
    end

    event :continued do
      transitions from: %i[state_new], to: :state_continue
    end

    event :activated do
      transitions from: %i[state_new state_suspend state_renewal state_limited state_continue], to: :state_active
    end

    event :limited do
      transitions from: [:state_active], to: :state_limited
    end

    event :suspended do
      transitions from: [:state_active], to: :state_suspend
    end

    event :closed do
      transitions from: %i[state_new state_active state_renewal state_suspend state_limited], to: :state_closed
    end

    # в этот статус STATE_RENEWAL можно перевести только закрытую подписку
    event :renewed do
      transitions from: [:state_closed], to: :state_renewal
    end
  end

  scope :active_stp_by_client, lambda { |client_id|
    includes(:tariff, :service).where(
      state: Subscription::STATE_ACTIVE,
      client_id: client_id,
      tariffs: {
        service_id: Service.tp_ids
      }
    )
  }

  # подписка с новым тарифом СТП
  scope :actual_new_stp_subscribe, lambda { |client_id, tariff_id|
    where('client_id = ? and tariff_id=? and state=?', client_id, tariff_id, Subscription::STATE_ACTIVE)
  }

  # установка часов техподдержки для новых тарифов
  def set_hours!
    tariff = Tariff.find(tariff_id)
    exists_new_tariff = tariff['extra']['new_tariff_hours'].detect { |trf| trf['name'] == jsondata['new_tariff_hours'] }
    settings_hours = tariff.settings['hours'].to_i
    if exists_new_tariff.present?
      self.settings = { hours: count_tehsupport_hours(settings_hours,
                                                      exists_new_tariff['name'].split.first.to_i * HOUR) }
      Tmsupport::RefreshHours.call(
        client_id: client_id,
        time: count_tehsupport_hours(
          settings_hours,
          exists_new_tariff['name'].split.first.to_i * HOUR
        )
      )
    end
  end

  def count_tehsupport_hours(settings_time, tariff_time)
    @count_tehsupport_hours = settings_time + tariff_time
  end

  def non_new_tariffs?
    singular_tariff? || urgent_tariff?
  end

  # установка часов техподдержки для старых тарифов
  def set_hours_from_tariff!
    tariff = Tariff.find_by(id: tariff_id)
    self.settings = tariff.settings if tariff.present?
  end

  def singular_tariff?
    tariff && tariff.extra['singular_tariff'] == true
  end

  def new_tariff?
    tariff && tariff.extra['new_tariff'] == true
  end

  def urgent_tariff?
    tariff && tariff.extra['urgent_tariff'] == true
  end

  def on_activate
    if zero_subscriptions? && may_activated?
      activated!
      if new_tariff?
        set_hours!
        save!
      elsif non_new_tariffs?
        set_hours_from_tariff!
        save!
      end
    end
    Success()
  end

  def on_deactivate
    Success()
  end

  def add_tm_hours_to_client
    settings_param = saved_changes['settings'].present? && saved_changes['settings'].select do |k, _v|
      true if k.keys[0] == 'hours'
    end
    if settings_param && valid?
      hours_array = settings_param.map { |key| key.values[0] if key.keys[0] == 'hours' }
      Tmsupport::RefreshHours.call(client_id: client_id, time: hours_array[1]) if hours_array.count == 2
    end
  end

  private

  # по умолчанию для всех подписок проверяем/создаем настройку по периодичности тарифа
  def check_or_create_notification
    ::AlertSettings::Kinds::Custom.new(self).call if tariff_periodic?
    ::AlertSettings::Kinds::TechSupport.new(self).call
  end

  def check_has_active_tehsupport?
    if Subscriptions::Tehsupport::Subscription.active_stp_by_client(client).count.positive?
      # enable_monitorings_alert! # пока залочить
    else
      disable_monitorings_alert!
    end
  end

  def enable_monitorings_alert!
    AlertSetting.where(client: client,
                       alert_type: %w[monitoring_smpp monitoring_backup
                                      monitoring_tms]).update_all(state: 'enabled')
  end

  def disable_monitorings_alert!
    AlertSetting.where(client: client,
                       alert_type: %w[monitoring_smpp monitoring_backup
                                      monitoring_tms]).update_all(state: 'disabled')
  end
end
