# frozen_string_literal: true

# == Schema Information
#
# Table name: sms_consumptions
#
#  id              :bigint           not null, primary key
#  period          :date
#  sentsmses_count :integer          default(0)
#  summ            :decimal(15, 2)   default(0.0)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  client_id       :bigint
#
# Indexes
#
#  index_sms_consumptions_on_client_id  (client_id)
#  index_sms_consumptions_on_period     (period)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#
class SmsConsumptionSerializer < ActiveModel::Serializer
  attributes :id, :sentsmses_count, :summ, :period
  has_one :client
end
