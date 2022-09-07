# CallsBot
# интерфейс CallsBot для фабрики Watcher в уведомлениях сервиса Subscriptions::CheckOrCreateNotification
module AlertSettings
  module Kinds
    class CallsBot
      def initialize(subscription)
        @subscription = subscription
      end

      def call
        AlertSetting.find_or_create_by(
          name: 'trigger.voice_robot',
          client_id: @subscription.client_id,
          alert_type: 'balance_trigger_voice_robot'
        ) do |as|
          as.email_enabled = false
          as.sms_enabled = false
          as.state = 'enabled'
          as.setting = { "balance_limit": 0 }
        end
      end
    end
  end
end
