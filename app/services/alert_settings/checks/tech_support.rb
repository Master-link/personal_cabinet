# Sms
# Отправка Email/sms для kind=tech_support, слушать AMQP протокол
# Запускать кроном  - проверять каждую минуту по всем подпискам тех поддержки
module AlertSettings
  module Checks
    class TechSupport
      def initialize(alert_settings)
        @alert_settings = alert_settings
        @current_date_time = DateTime.now
        @logger = Logger.new("#{Rails.root}/log/check_tech_support.log")
      end

      def call
        # @alert_settings.last_send_at и @alert_settings.first_send_at не могут быть пустыми
        # оба поля инициализируются в app/workers/platform/monitoring.rb
        return unless @alert_settings.last_send_at.present? && @alert_settings.first_send_at.present?

        different_time = ((
                            @alert_settings.last_send_at.to_datetime - @alert_settings.first_send_at.to_datetime
                          ) * 24 * 60).to_i

        if @alert_settings.settings["grace_period"].to_i > 0 &&
            different_time % @alert_settings.settings["grace_period"].to_i == 0 &&
            different_time > @alert_settings.settings["downtime_period"]

          email_template, sms_template = format_message(@alert_settings, different_time, @current_date_time)

          if @alert_settings.email_enabled.present? &&
              email_template.present? &&
              @alert_settings.client.settings["alert_emails"].present?
            AlertsMailer.notification(
              @alert_settings.client.settings["alert_emails"].split(","),
              email_template
            ).deliver_now
            @logger.info "An Email has been sent to #{@alert_settings.client.settings["alert_emails"].split(",")}"
          end
        end

        # после каждой проверки обновляем last_send_at, для обновления different_time
        @alert_settings.last_send_at = DateTime.now
        @alert_settings.save
      rescue => e
        @logger.error "fail alert notification: Subscription ID #{@subscription.id}"
        @logger.error e.inspect
      end

      private

      def format_message(alert_settings, downtime, date_time_now)
        email_template = alert_settings.service
          .alert_template_email
          .gsub(/%service_name%/, alert_settings.service.name.to_s)
          .gsub(/%alert_time%/, date_time_now.iso8601.to_s)
          .gsub(/%downtime%/, "#{downtime} мин")

        sms_template = alert_settings.service
          .alert_template_sms
          .gsub(/%service_name%/, alert_settings.service.name.to_s)
          .gsub(/%alert_time%/, date_time_now.iso8601.to_s)
          .gsub(/%downtime%/, "#{downtime} мин")
        [email_template, sms_template]
      end
    end
  end
end
