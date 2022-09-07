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
# SMS
class Subscriptions::Sms::SmsBase < Subscription
  has_many :opsms, as: :smsable # подписка смс может иметь много опций
  accepts_nested_attributes_for :opsms, allow_destroy: true

  after_save :check_or_create_notification

  aasm column: "state" do
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
      transitions from: %i[state_new state_renewal state_continue], to: :state_active,
        guard: :can_new_activate?
      transitions from: %i[state_suspend state_limited], to: :state_active,
        guard: :can_activate_now?
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

    # в этот статус можно перевести только закрытую подписку
    event :renewed do
      transitions from: [:state_closed], to: :state_renewal
    end
  end

  def can_new_activate?
    enough_money_for_activating?
  end

  def can_activate_now?
    kredit_limit_no_overflowed?
  end

  def client_active_subscriptions
    Subscription.where(
      client: client,
      tariff: Tariff.tariffs_for_services(Service.client_sms(client).pluck(:id))
    ).actives
  end

  def on_activate
    value = call_on_activate
    if value.success?
      activated! if may_activated?
      Success("успешная активация смс логина")
    else
      Failure("Ошибка активации")
    end
  end

  def on_deactivate
    value = call_on_deactivate
    if value.success?
      limited! if may_limited?
      Success("успешная деактивация смс логина")
    else
      Failure("Ошибка активации")
    end
  end

  # приостановить/восстановить(ативировано) без условий
  def shift_suspend!
    case aasm_read_state
    when Subscription::STATE_ACTIVE
      suspended!
    when Subscription::STATE_SUSPEND
      activated!
    end
  end

  def update!(attributes)
    super
    if attributes[:credit_limit].present?
      if service_balance.balance.to_f > credit_limit.to_f
        on_activate if state == Subscription::STATE_LIMITED.to_s
      elsif state == Subscription::STATE_ACTIVE.to_s
        on_deactivate
      end
    end
  end

  private

  def check_or_create_notification
    Subscriptions::CheckOrCreateNotification.call(subscription: self)
  end

  def call_on_activate
    Success()
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    Failure()
  end

  def call_on_deactivate
    Success()
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    Failure()
  end
end
