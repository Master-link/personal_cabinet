# == Schema Information
#
# Table name: cb_dailystats
#
#  id                 :bigint           not null, primary key
#  count              :integer          default(0)
#  old_count          :integer          default(0)
#  period             :date
#  price              :decimal(, )      default(0.0)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  client_id          :integer
#  sms_consumption_id :integer
#
# Indexes
#
#  index_cb_dailystats_on_client_id           (client_id)
#  index_cb_dailystats_on_period              (period)
#  index_cb_dailystats_on_sms_consumption_id  (sms_consumption_id)
#
class CbDailystatSerializer < ActiveModel::Serializer
  attributes :id, :login, :orders, :count, :old_count, :price, :client_id, :sms_consumption_id
end
