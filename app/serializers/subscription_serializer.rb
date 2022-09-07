# frozen_string_literal: true

# == Schema Information
#
# Table name: subscriptions
#
#  id           :bigint           not null, primary key
#  credit_limit :integer
#  ended_at     :datetime
#  jsondata     :json
#  settings     :json
#  started_at   :datetime
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  client_id    :bigint
#  tariff_id    :bigint
#
# Indexes
#
#  index_subscriptions_on_client_id  (client_id)
#  index_subscriptions_on_tariff_id  (tariff_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (tariff_id => tariffs.id)
#
# serializer
class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :state, :credit_limit, :jsondata, :settings, :started_at, :ended_at
  has_one :client
  has_one :tariff
end
