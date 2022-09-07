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
class ClientRequisite < ApplicationRecord
  belongs_to :client

  def individual?
    passport_number && !passport_number.empty?
  end

  # i18n доработать
  def get_requisites_as_string(*requisites)
    output = []
    requisites.each do |requisite_name|
      value = send(requisite_name)
      output << translate_attribute(requisite_name, value) if value.present?
    end
    output.join(", ")
  end

  def i18n_key
    model_name.i18n_key
  end

  def translate_attribute(requisite_name, value)
    I18n.t("#{i18n_key}.#{requisite_name}", count: value)
  end

  def jsonapi_serializer_class_name
    Old::ClientRequisiteSerializer
  end
end
