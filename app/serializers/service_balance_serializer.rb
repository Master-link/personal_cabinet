# frozen_string_literal: true

# == Schema Information
#
# Table name: service_balances
#
#  id         :bigint           not null, primary key
#  balance    :decimal(15, 2)   default(0.0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  client_id  :bigint
#  service_id :bigint
#
# Indexes
#
#  index_service_balances_on_client_id                 (client_id)
#  index_service_balances_on_client_id_and_service_id  (client_id,service_id) UNIQUE
#  index_service_balances_on_service_id                (service_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (service_id => services.id)
#
# serializer
class ServiceBalanceSerializer < ActiveModel::Serializer
  attributes :id, :balance
  has_one :client
  has_one :service
end
