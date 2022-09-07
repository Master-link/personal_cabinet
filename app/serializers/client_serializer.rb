# frozen_string_literal: true

# == Schema Information
#
# Table name: clients
#
#  id                 :bigint           not null, primary key
#  deleted_at         :datetime
#  email              :string
#  name               :string
#  organization       :text
#  settings           :json
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  country_id         :bigint
#  crm_id             :integer
#  employee_id        :bigint
#  platform_client_id :integer
#
# Indexes
#
#  index_clients_on_country_id   (country_id)
#  index_clients_on_deleted_at   (deleted_at)
#  index_clients_on_employee_id  (employee_id)
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (employee_id => employees.id)
#
# serializer
class ClientSerializer < ActiveModel::Serializer
  attributes :id,
             :country_id,
             :crm_id,
             :name,
             :email,
             :organization,
             :platform_client_id,
             :settings,
             :user_id,
             :employee_id
  has_one :country
  has_one :crm
  has_one :user
  has_one :employee
  has_one :client_requisite
  has_many :service_balances
end
