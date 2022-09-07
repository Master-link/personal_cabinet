# frozen_string_literal: true

# a mailer
class PeriodicDocumentMailer < ApplicationMailer
  before_action :set_params, only: [:send_email]

  default from: APP_CONFIG['mail_from_host']

  def send_email
    document_name = @document.tariff.service.name
    subject = "Автоматическое выставление счета по услуге #{document_name}"
    filename_for_email = "#{subject.gsub(' ', '_').downcase}(#{document_name})_" \
"№#{@document.id}_#{@document.created_at.strftime('%d.%m.%Y')}.pdf"
    attachments[filename_for_email] = File.read(params[:pdf])
    mail(
      to: params[:email],
      subject: subject,
      template_name: 'document'
    )
  end

  private

  def set_params
    @document = params[:document]
    @subscription = params[:subscription]
    @client = @document.client
  end
end
