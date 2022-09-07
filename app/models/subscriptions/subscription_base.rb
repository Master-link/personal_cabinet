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
# Акселератор
class ::Subscriptions::SubscriptionBase < Subscription
  after_save :check_or_create_notification
  after_save :check_or_create_balance

  ### Стэйт машина - общая
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

  private

  # по умолчанию для всех подписок проверяем/создаем настройку по периодичности тарифа
  def check_or_create_notification
    ::AlertSettings::Kinds::Custom.new(self).call if tariff_periodic?
  end

  def check_or_create_balance
    ServiceBalance.find_or_create_by(service: service, client: client)
  end
end
