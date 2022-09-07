# frozen_string_literal: true

# == Schema Information
#
# Table name: service_balances
#
#  id         :bigint           not null, primary key
#  balance    :decimal(15, 2)   default(0.0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  client_id  :bigint
#  service_id :bigint
#
# Indexes
#
#  index_service_balances_on_client_id                 (client_id)
#  index_service_balances_on_client_id_and_service_id  (client_id,service_id) UNIQUE
#  index_service_balances_on_service_id                (service_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (service_id => services.id)
#
class ServiceBalance < ApplicationRecord
  audited

  after_save :try_activate_subscriptions
  after_save :check_alert_notification
  after_save :send_balance

  belongs_to :client
  belongs_to :service

  validates :client_id, numericality: { only_integer: true }
  validates :service_id, numericality: { only_integer: true }
  # validates :balance, numericality: { only_integer: true }

  validates :client, uniqueness: { scope: :service }

  # вычитание баланса
  def subtract_balance!(money)
    update!(balance: (balance - money))
  end

  # пополнение баланса
  def add!(money)
    update!(balance: (balance.to_f + money.to_f))
  end

  def jsonapi_serializer_class_name
    Old::ServiceBalanceSerializer
  end

  # При пополнении баланса статус меняем только из Subscription::STATE_LIMITED
  # из Subscription::STATE_NEW нельзя, там своя логика
  # из STATE_SUSPENDED - нельзя, менеджеру нужно вручную переключать статусы
  # из STATE_CLOSE - нельзя, тут все понятно
  # из STATE_RENEWAL - неясно что там.
  # остается только STATE_LIMITED
  def try_activate_subscriptions
    service = self.service

    sbs = Subscription.where(client: client).where(tariff: Tariff.where(service: self.service)).where(
      state: [Subscription::STATE_LIMITED]
    )
    sbs.each do |sb|
      klass = "::Subscriptions::#{sb.service_ticket_tariff_class}::Subscription".constantize
      subscription = klass.find(sb.id)
      subscription.on_activate if balance.to_f > subscription.credit_limit.to_f
    end
  end

  # проверка не опустился ли баланс ниже чем указано в уведомлениях
  def check_alert_notification
    if service.is_sms_service?
      AlertSettings::Checks::SmsGate.new(
        'balance_trigger_sms', client, service.alert_template_email, service.alert_template_sms, balance
      ).call
    end
    if service.is_calls_bot_service?
      AlertSettings::Checks::CallsBot.new(
        'balance_trigger_voice_robot', client, service.alert_template_email, service.alert_template_sms, balance
      ).call
    end
  end

  # проверка не опустился ли баланс ниже чем указано в уведомлениях
  def send_balance
    service_balances = ServiceBalance.where(client_id: client_id)
    ActionCable.server.broadcast "BalanceChannel:#{client_id}",
                                 ServiceBalancesPresenter.new(service_balances)
  end

  class << self
    def check_service_balance(client_id:, service_id:)
      ServiceBalance.find_or_create_by!(client_id: client_id, service_id: service_id)
    end
  end
end
