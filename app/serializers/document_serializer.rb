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
# serializer
class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :document_type, :price, :creation_datetime, :file_name, :created_at
  has_one :client
  has_one :tariff
end
