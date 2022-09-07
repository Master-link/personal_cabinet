# frozen_string_literal: true

# a mailer
class AlertsMailer < ApplicationMailer
  default from: APP_CONFIG['mail_from_host'],
          reply_to: APP_CONFIG['mail_reply'],
          return_path: APP_CONFIG['mail_return_path']

  def notification(emails, message)
    @message = message
    mail(to: emails, subject: "Уведомление от #{APP_CONFIG['frontend_url']}")
  end

end
