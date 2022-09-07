# == Schema Information
#
# Table name: callbot_consumptions
#
#  id         :bigint           not null, primary key
#  count      :integer          default(0)
#  period     :date
#  summ       :decimal(, )      default(0.0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  client_id  :bigint
#
# Indexes
#
#  index_callbot_consumptions_on_client_id  (client_id)
#  index_callbot_consumptions_on_period     (period)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#
class CallbotConsumptionSerializer < ActiveModel::Serializer
  attributes :id, :order, :sum, :period
  has_one :client
end
