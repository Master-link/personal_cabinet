# Custom
# интерфейс Custom для фабрики Watcher в уведомлениях сервиса Subscriptions::CheckOrCreateNotification
module AlertSettings
  module Kinds
    class Custom
      def initialize(subscription)
        @subscription = subscription
      end

      def call
        AlertSetting.find_or_create_by(
          name: 'trigger.comes_expire_trigger',
          client_id: @subscription.client_id,
          alert_type: 'comes_expire_trigger'
        ) do |as|
          as.email_enabled = false
          as.sms_enabled = false
          as.state = 'enabled'
          as.setting = { "before_days": [] }
        end
      end
    end
  end
end
