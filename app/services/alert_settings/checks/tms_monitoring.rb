# frozen_string_literal: true

# Отправка Email/sms для alert_type = tms_monitoring
# Запускать кроном  - проверять каждую минуту по всем подпискам тех поддержки
# Условие работы модуля:
#  * аргументом приходит AlertSetting у которого выставлено смс или email уведомление
#  * в настройках grace_period и downtime_period не равны 0
module AlertSettings
  module Checks
    class TmsMonitoring
      def initialize(alert_setting)
        @alert_setting = alert_setting
        @client = alert_setting.client
        @grace_period = @alert_setting.settings["grace_period"].to_i * 60
        @downtime_period = @alert_setting.settings["downtime_period"].to_i * 60
        @logger = Logger.new("#{Rails.root}/log/check_tms_accessible.log")
      end

      def call
        if @grace_period > 0 && interval_between_send > @grace_period || @alert_setting.first_send_at.nil?
          # @grace_period > 0 - лишнее, пусть будет "защита от дурака"
          # условие когда пришло время отправки
          # после каждой проверки обновляем last_send_at, для обновления different_time
          time_update = DateTime.now

          monitorings = ::Monitorings::TmServer.new.call(@client)
          monitorings.each do |monitoring|
            next unless monitoring.status === "down" && monitoring.downtime.to_i > @downtime_period
            email_template, sms_template = format_message(monitoring.service_name, monitoring.downtime)
            send_email(email_template)
            send_sms(sms_template)
            @alert_setting.first_send_at = time_update
          end

          @alert_setting.last_send_at = time_update
          @alert_setting.save
        else
          # условие когда не пришло время отправки
          @alert_setting.last_send_at = DateTime.now
          @alert_setting.save
        end
        @alert_setting
      rescue => e
        @logger.error "fail alert notification: Subscription ID #{@subscription.id}"
        @logger.error e.inspect
      end

      private

      def count_interval
        now_date = DateTime.now
        ((@alert_setting.last_send_at || now_date) - (@alert_setting.first_send_at || now_date)).to_i
      end

      def interval_between_send
        now_date = DateTime.now
        now_date.to_i - (@alert_setting.last_send_at || now_date).to_i
      end

      def send_email(email_template)
        if @alert_setting.email_enabled.present? &&
            email_template.present? &&
            @alert_setting.client.settings["alert_emails"].present?
          AlertsMailer.notification(
            @alert_setting.client.settings["alert_emails"].split(","),
            email_template
          ).deliver_now
          @logger.info "An Email has been sent to #{@alert_setting.client.settings["alert_emails"].split(",")}"
        end
      end

      def format_message(address, down_time)
        email_template = @alert_setting.service
          .ticket["tms"]["alert_template_email"]
          .gsub(/%address%/, address)
          .gsub(/%period%/, "#{down_time} cek")

        sms_template = @alert_setting.service
          .ticket["tms"]["alert_template_sms"]
          .gsub(/%address%/, address)
          .gsub(/%period%/, "#{down_time} cek")
        [email_template, sms_template]
      end
    end
  end
end
