# frozen_string_literal: true

# Базовый класс мониторинга по СМС и ГР
module AlertSettings
  module Checks
    class BaseMonitoring
      include ::SocketConcern::SocketPublisher
      include ::NtfConcern::MessageConcern::CheckoutReadNtfMessage

      def initialize(alert_type, client, email_template, sms_template, balance)
        @alert_type = alert_type
        @client = client
        @email_template = email_template
        @sms_template = sms_template
        @balance = balance
        @logger = Logger.new("#{Rails.root}/log/check_treshold_balances.log")
      end

      def call
        @alert_settings = AlertSetting.find_by(
          client_id: @client.id,
          alert_type: @alert_type,
          state: "enabled"
        )

        return unless @alert_settings.present?

        if @balance.to_f < @alert_settings.setting["balance_limit"].to_f
          unless @alert_settings.first_send_at.present?
            email_template = format_message(@email_template, @alert_settings.setting["balance_limit"])
            sms_template = format_message(@sms_template, @alert_settings.setting["balance_limit"])
            alert_emails = @client.settings["alert_emails"].split(",")
            alert_phone = @client.settings["alert_phone"]

            if alert_emails.present? && email_template.present? && @alert_settings.email_enabled
              AlertsMailer.notification(alert_emails, email_template).deliver_now
              @logger.info "An Email has been sent to #{alert_emails}"
            end

            # уведомление отправить по условию задачи
            @notification = email_template || sms_template
            send_by_socket

            @alert_settings.first_send_at = DateTime.now
            @alert_settings.save
          end
        else
          @alert_settings.first_send_at = nil
          @alert_settings.save
        end
      rescue => e
        @logger.error "fail alert notification: Client ID #{@client.id}"
        @logger.error e.inspect
      end

      private

      def format_message(template, balance_limit)
        template
          .gsub(/%balance_limit%/, balance_limit.to_s)
          .gsub(/%site_uri%/, APP_CONFIG["frontend_url"])
      end

      def send_by_socket
        truncate_message = ActionController::Base.helpers.strip_tags(@notification)
          .try(:strip)
          .truncate(255, omission: "")
        link_route = "/services_client/show/#{@service.id}/subscriptions"
        target_users_ids = @client.crm.users.pluck(:id).uniq

        if target_users_ids.present?
          message = add_message_for_users(
            target_users_ids,
            ::Ntf::Category.find_by(title: "monitoring").id,
            truncate_message,
            link_route
          )

          # отправим сообщение каждому юзеру клиента
          cable_publish_for_users(
            target_users_ids,
            messages: {
              id: message.id,
              message: truncate_message,
              link: link_route,
              category: {
                title: message.category.title
              }
            }
          )
        end
      rescue
      end
    end
  end
end
