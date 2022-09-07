module TariffConditions
  extend ActiveSupport::Concern

  included do
    # Поиск по клиенту, подписка на момент заданной даты и тип Тарифа с kind=Service::KIND_SMS_GATE
    # Это означает в тарифе поле extra обязательно содержит объект "tariffs": {перечисленные тарифы}
    scope :sms_subscription, lambda { |client_id:, start_period:|
      joins(:subscriptions, :service)
        .find_by!("
        subscriptions.client_id = ? and
        subscriptions.started_at < ? and
        subscriptions.ended_at > ? and
        services.ticket->>'kind'=?",
                  client_id, start_period, start_period, Service::KIND_SMS_GATE)
    }
  end
end
