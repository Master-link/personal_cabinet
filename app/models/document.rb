# frozen_string_literal: true

# == Schema Information
#
# Table name: documents
#
#  id                :bigint           not null, primary key
#  creation_datetime :datetime
#  document_type     :integer          default("sms_service_act")
#  file_name         :string
#  price             :decimal(15, 2)   default(0.0)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  client_id         :bigint
#  tariff_id         :bigint
#  transaction_id    :bigint
#
# Indexes
#
#  index_documents_on_client_id       (client_id)
#  index_documents_on_tariff_id       (tariff_id)
#  index_documents_on_transaction_id  (transaction_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (tariff_id => tariffs.id)
#  fk_rails_...  (transaction_id => transactions.id)
#
class Document < ApplicationRecord
  include FilterScope

  belongs_to :payment_transaction, class_name: 'Transaction', foreign_key: 'transaction_id', optional: true
  belongs_to :client
  belongs_to :tariff

  SMS_SERVICE_ACT_DOCTYPE     = 'sms_service_act' # для создания актов
  SMS_SERVICE_INVOICE_DOCTYPE = 'sms_service_invoice' # для создания счетов
  PERIODIC_FORTNIGHT_DOCTYPE = 'periodic_fortnight' # счет для подписок, тариф kind=kind_periodic - среди всех услуг

  enum document_type: [SMS_SERVICE_ACT_DOCTYPE, SMS_SERVICE_INVOICE_DOCTYPE, PERIODIC_FORTNIGHT_DOCTYPE]

  def self.generate_file_name(document_type)
    uuid = SecureRandom.uuid[0..7]
    "#{document_type}-#{Time.zone.now.to_i}-#{uuid}"
  end

  scope :index_paginate, lambda { |get_params|
    do_filter(get_params[:filter])
      .document_filter(get_params[:document_filter])
      .order("documents.#{get_params[:sort]} #{get_params[:order]}")
      .paginate(per_page: get_params[:limit], page: get_params[:page])
  }

  scope :client_index_paginate, lambda { |get_params|
    where(client_id: get_params[:client_id])
      .index_paginate(get_params)
  }

  def pdf_path
    Rails.root.join(
      APP_CONFIG['users_documents_folder'],
      client.id.to_s,
      "#{file_name}.pdf"
    ).to_s
  end

  # TODO: сделать генерацию при инициализации до сохранения в базу
  def init_file_name
    if new_record?
      self.file_name = Document.generate_file_name(document_type)
    else
      return file_name if file_name.present?

      update(file_name: Document.generate_file_name(document_type))
    end
    file_name
  end

  def currency
    self&.tariff&.service&.currency || Currency.find_by(iso4217_code: 'RUB')
  end
end
