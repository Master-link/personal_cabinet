#
# Логика для подписок по услуге Статистика Платежного гейта
#
module PaymentSystems
  extend ActiveSupport::Concern

  included do
    PAYMENT_SYSTEMS = %w[
    ]

    scope :active_pg_subscribes, lambda {
      joins(:service)
        .where(state: [
          Subscription::STATE_ACTIVE
        ])
        .where("services.ticket->>'kind' = ?", Service::PAYMENT_GATE)
    }
  end
end
