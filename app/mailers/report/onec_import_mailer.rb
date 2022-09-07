# frozen_string_literal: true

module Report
  # a mailer
  class OnecImportMailer < ApplicationMailer
    default from: APP_CONFIG["mail_from_host"],
      reply_to: APP_CONFIG["mail_reply"],
      return_path: APP_CONFIG["mail_return_path"]

    def report(email, imports)
      @imports = imports
      mail(to: email, subject: "Отчет импорта")
    end
  end
end
