# frozen_string_literal: true

# a mailer
class SubscriptionMailer < ApplicationMailer
  default from: APP_CONFIG["mail_from_host"]

  def email_closed_subscription
    @subscription = params[:subscription]

    mail(
      to: @subscription.client.email,
      subject: "Закрытие подписки",
      template_name: "close_subscription"
    )
  end

  def renewal_subscription
    @subscription = params[:subscription]

    mail(
      to: @subscription.client.email,
      subject: "Продление  подписки",
      template_name: "renewal_subscription"
    )
  end

  def report_subscription
    attachments[params[:file_name]] = File.read(params[:file])
    mail(
      to: params[:mail],
      subject: "Смена тарифов у подписок",
      template_name: "report_subscription"
    )
  end
end
