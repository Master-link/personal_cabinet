# Sms
# Отправка Email/sms для kind=license, применять только к таким подпискам
# CRONTAB: добавить в кронтаб 1 раз в день
module AlertSettings
  module Checks
    class License
      def initialize(subscription)
        @subscription = subscription
        @logger = Logger.new("#{Rails.root}/log/check_license.log")
      end

      def call
        @alert_settings = AlertSetting.find_by(
          client_id: @subscription.client.id,
          alert_type: Service::KIND_LICENSE,
          service_id: @subscription.tariff.service_id
        )

        if @subscription.ended_at.present? && @alert_settings.present?
          # вычислить дни
          @different_days = (@subscription.ended_at.to_date - DateTime.now.to_date).to_i

          if @alert_settings.settings["before_days"].first.split(",").map(&:to_i).include? @different_days
            email_template, sms_template = format_message
            alert_emails = @subscription.client.settings["alert_emails"].split(",")
            alert_phone = @subscription.client.settings["alert_phone"]

            if alert_emails.present? && email_template.present? && @alert_settings.email_enabled
              AlertsMailer.notification(alert_emails, email_template).deliver_now
              @logger.info "An Email has been sent to #{alert_emails}"
            end

            @alert_settings.first_send_at = DateTime.now unless @alert_settings.first_send_at.present?
            @alert_settings.last_send_at = DateTime.now
            @alert_settings.save
          end
        end
      rescue => e
        @logger.error "fail alert notification: Subscription ID #{@subscription.id}"
        @logger.error e.inspect
      end

      private

      def format_message
        email_template = @subscription
          .tariff
          .service
          .alert_template_email
          .gsub(/%days%/, @different_days.to_s)
          .gsub(/%service_name%/, @subscription.tariff.service.name)
        sms_template = @subscription
          .tariff
          .service
          .alert_template_sms
          .gsub(/%days%/, @different_days.to_s)
          .gsub(/%service_name%/, @subscription.tariff.service.name)
        [email_template, sms_template]
      end
    end
  end
end
