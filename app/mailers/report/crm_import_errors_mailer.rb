# frozen_string_literal: true

module Report
  # a mailer
  class CrmImportErrorsMailer < ApplicationMailer
    default from: APP_CONFIG["mail_from_host"],
      reply_to: APP_CONFIG["mail_reply"],
      return_path: APP_CONFIG["mail_return_path"]

    def report(email, clients_errors)
      @clients_errors = clients_errors
      mail(to: email, subject: "Ошибки импорта")
    end
  end
end
