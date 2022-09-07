# frozen_string_literal: true

# a mailer
class DocumentMailer < ApplicationMailer
  before_action :set_params, only: [:send_email]

  default from: APP_CONFIG["mail_from_host"]
  TITLES = {
    "sms_service_act" => "Акт от application.ru",
    "sms_service_invoice" => "Счёт на оплату от application.ru"
  }.freeze

  def send_email
    @document.tariff.service.name

    subject = I18n.t("document_types.#{@document.document_type}")
    filename_for_email = "#{subject.tr(" ", "_").downcase}(#{@document.tariff.service.name})_" \
"№#{@document.id}_#{@document.created_at.strftime("%d.%m.%Y")}.pdf"

    attachments[filename_for_email] = File.read(params[:pdf])
    mail(
      to: params[:email],
      subject: subject,
      template_name: @document.document_type
    )
  end

  private

  def set_params
    @document = params[:document]
    @client = @document.client
  end
end
