# frozen_string_literal: true

# == Schema Information
#
# Table name: client_requisites
#
#  id                    :bigint           not null, primary key
#  act_because_of        :string
#  address               :string
#  bank_bik              :string
#  bank_cash_account     :string
#  bank_checking_account :string
#  bank_name             :string
#  company_type          :string
#  full_name             :string
#  head_chief            :string
#  head_chief_signature  :string
#  inn                   :string
#  kpp                   :string
#  passport_issued       :string
#  passport_issued_date  :string
#  passport_number       :string
#  passport_series       :string
#  phone                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  client_id             :bigint
#
# Indexes
#
#  index_client_requisites_on_client_id  (client_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#
# serializer
class ClientRequisiteSerializer < ActiveModel::Serializer
  attributes :id, :company_type, :inn, :kpp, :full_name, :head_chief,
             :act_because_of, :head_chief_signature, :address, :bank_checking_account,
             :bank_cash_account, :bank_name, :bank_bik, :phone, :passport_series, :passport_number,
             :passport_issued, :passport_issued_date

  has_one :client
end
