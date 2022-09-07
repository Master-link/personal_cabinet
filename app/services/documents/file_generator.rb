# frozen_string_literal: true

module Documents
  class FileGenerator < ApplicationService
    def initialize(args)
      @document = args.fetch(:document)
      @file_name = @document.file_name || @document.init_file_name
      @folder_path = Rails.root.join(APP_CONFIG["users_documents_folder"], @document.client.id.to_s)
    end

    def subject_present?
      subject.present?
    end

    def call
      create_folder_if_does_not_exists

      document_html_data = ActionController::Base.new.render_to_string(
        template: "documents/#{@document.document_type}",
        layout: "document_html",
        locals: {document: @document, subject: subject, client_requisites: extract_requisites}
      )
      save_to_file(document_html_data, "html")

      pdf_html = ActionController::Base.new.render_to_string(
        template: "documents/#{@document.document_type}",
        layout: "pdf",
        locals: {document: @document, subject: subject, client_requisites: extract_requisites}
      )
      # pdf_data = WickedPdf.new.pdf_from_string(pdf_html)
      # save_to_file(pdf_data, "pdf")
      #
      # @file_name
    end

    private

    def save_to_file(data, file_format)
      save_path = Rails.root.join(@folder_path, "#{@file_name}.#{file_format}")
      File.open(save_path, "wb") do |file|
        file << data
      end
    end

    def create_folder_if_does_not_exists
      FileUtils.mkdir_p(@folder_path) unless File.directory?(@folder_path)
    end

    def subject
      if @document.tariff.nomenclatures.present?
        @document.tariff.nomenclatures.first.name
      elsif (document_subject = @document.tariff.document_subject).present?
        document_subject
      elsif (nomenclature_id = @document.tariff.extra.dig("nomenclature_id")).present?
        (nomenclature_id = nomenclature_id.dig(0, "id")) if nomenclature_id.instance_of?(Array)
        (return Nomenclature.find(nomenclature_id)&.name) if nomenclature_id.present?
      elsif @document.tariff.extra["documents"]
        @document.tariff.extra["documents"]
      end
    end

    def extract_requisites
      requisite = @document.client.client_requisite

      if requisite.individual?
        requisite.get_requisites_as_string(:full_name)
      else
        requisite.get_requisites_as_string(:full_name, :inn, :kpp, :address)
      end
    end
  end
end
