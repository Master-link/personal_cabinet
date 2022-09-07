# frozen_string_literal: true

module V1
  class DocumentsController < ApplicationController
    before_action :new_document, only: [:create]
    authorize_resource
    load_and_authorize_resource
    before_action :set_document, only: %i[show update destroy send_email pdf html]

    def new_document
      @document = Document.new(with_params)
    end

    def index
      index_params
      documents = Document.includes(tariff: {service: :currency}).index_paginate(get_params)
      meta = {total_pages: documents.total_pages}

      render json: DocumentsIndexPresenter.new(documents: documents, meta: meta)
    end

    def client_index
      index_params
      documents = Document.includes(tariff: {service: :currency}).client_index_paginate(get_params)
      meta = {total_pages: documents.total_pages}

      render json: DocumentsIndexPresenter.new(documents: documents, meta: meta)
    end

    def pdf
      file_path = Rails.root.join(APP_CONFIG["users_documents_folder"], @document.client_id.to_s)

      filename = if File.exist?(file_path.join("#{@document.file_name}.pdf"))
        @document.file_name.to_s
      else
        Documents::FileGenerator.call(document: @document).to_s
      end

      file_path = file_path.join("#{filename}.pdf")
      send_file(file_path, filename: filename, type: "application/pdf")
    end

    def html
      file_path = Rails.root.join(APP_CONFIG["users_documents_folder"], @document.client_id.to_s)
      unless File.exist?(file_path.join("#{@document.file_name}.html"))
        Documents::FileGenerator.call(document: @document)
      end
      file_path = file_path.join("#{@document.file_name}.html")
      file = File.open(file_path)
      html = file.read.html_safe

      render json: {data: html}
    end

    def create
      params[:document][:document_type] = Document::SMS_SERVICE_INVOICE_DOCTYPE
      document = Document.create!(with_params)
      Documents::FileGenerator.call(document: document)

      json_response "", :created
    end

    def send_email
      Documents::FileGenerator.call(document: @document)
      DocumentMailer
        .with(email: email_params[:email], document: @document, pdf: @document.pdf_path)
        .send_email
        .deliver_now
      json_response
    end

    private

    def set_document
      @document = Document.find(params[:id])
    end

    def with_params
      params.require(:document).permit(
        :client_id,
        :tariff_id,
        :document_type,
        :price,
        :creation_datetime,
        :file_name
      )
    end

    def get_params
      params.permit(:page, :client_id, :sort, :order, :limit, document_filter: [:search], filter: [:id])
    end

    def email_params
      params.permit(:email)
    end

    def doc_params
      params.permit(:id)
    end

    def index_params
      param! :sort, String, in: %w[id price created_at], transform: :downcase, default: "created_at"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "desc"
      param! :page, Integer, default: 1
      param! :document_filter, Hash, required: true do |document_filter_params|
        document_filter_params.param! :search, String
      end
    end
  end
end
