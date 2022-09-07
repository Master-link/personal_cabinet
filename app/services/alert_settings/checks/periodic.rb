# Отправка Email/sms для подписок заканчивающиеся через N дней
# CRONTAB: добавить в кронтаб 1 раз в день
module AlertSettings
  module Checks
    class Periodic
      attr_accessor :different_days, :subscription, :different_days

      def initialize(subscription)
        @subscription = subscription
        @logger = Logger.new("#{Rails.root}/log/check_periodic.log")
      end

      def call
        alert_settings = AlertSetting.find_by(
          client_id: @subscription.client.id,
          alert_type: "comes_expire_trigger",
          state: "enabled"
        )

        return unless alert_settings.present?

        if @subscription.ended_at.present? && alert_settings.present?
          # вычислить день, который должен присутствовать в alert_settings.setting['before_days']
          @different_days = (@subscription.ended_at.to_date - DateTime.now.to_date).to_i

          if @different_days.positive? && alert_settings.setting["before_days"].map(&:to_i).include?(@different_days)
            email_template = format_message(@subscription.service.alert_template_email)
            sms_template = format_message(@subscription.service.alert_template_sms)

            alert_emails = @subscription.client.settings["alert_emails"].split(",")
            alert_phone = @subscription.client.settings["alert_phone"]

            if alert_emails.present? && email_template.present? && alert_settings.email_enabled
              AlertsMailer.notification(alert_emails, email_template).deliver_now
              @logger.info "An Email has been sent to #{alert_emails}"
            end

            alert_settings.first_send_at = DateTime.now unless alert_settings.first_send_at.present?
            alert_settings.last_send_at = DateTime.now
            alert_settings.save
          end
        end
      rescue => e
        @logger.error "fail alert notification: Subscription ID #{@subscription.id}"
        @logger.error e.inspect
      end

      private

      def format_message(template)
        template
          .gsub(/%days%/, @different_days.to_s)
          .gsub(/%service_name%/, @subscription.service.name)
      end
    end
  end
end
