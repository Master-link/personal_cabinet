# frozen_string_literal: true

# == Schema Information
#
# Table name: transactions
#
#  id              :bigint           not null, primary key
#  detail          :json
#  money           :decimal(15, 2)   not null
#  source          :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  client_id       :bigint
#  one_c_id        :string
#  service_id      :bigint
#  subscription_id :bigint
#  user_id         :bigint
#
# Indexes
#
#  index_transactions_on_client_id        (client_id)
#  index_transactions_on_service_id       (service_id)
#  index_transactions_on_subscription_id  (subscription_id)
#  index_transactions_on_user_id          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (service_id => services.id)
#  fk_rails_...  (subscription_id => subscriptions.id)
#  fk_rails_...  (user_id => users.id)
#
# serializer
class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :one_c_id, :money, :source, :detail, :updated_at, :created_at
  has_one :client
  has_one :subscription
  has_one :service
  has_one :user
end
