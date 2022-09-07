# TechSupport
# интерфейс TechSupport для фабрики Watcher в уведомлениях сервиса Subscriptions::CheckOrCreateNotification
module AlertSettings
  module Kinds
    class TechSupport
      def initialize(subscription)
        @subscription = subscription
      end

      def call
        AlertSetting.find_or_create_by(
          name: 'trigger.monitoring_tms',
          client_id: @subscription.client_id,
          alert_type: 'monitoring_tms'
        ) do |as|
          as.email_enabled = false
          as.sms_enabled = false
          as.state = 'disabled'
          as.setting = { "grace_period": 0, "downtime_period": 0 }
        end

        AlertSetting.find_or_create_by(
          name: 'trigger.monitoring_smpp',
          client_id: @subscription.client_id,
          alert_type: 'monitoring_smpp'
        ) do |as|
          as.email_enabled = false
          as.sms_enabled = false
          as.state = 'disabled'
          as.setting = { "grace_period": 0, "downtime_period": 0 }
        end

        AlertSetting.find_or_create_by(
          name: 'trigger.monitoring_backup',
          client_id: @subscription.client_id,
          alert_type: 'monitoring_backup'
        ) do |as|
          as.email_enabled = false
          as.sms_enabled = false
          as.state = 'disabled'
          as.setting = { "before_days": [] }
        end
      end
    end
  end
end
