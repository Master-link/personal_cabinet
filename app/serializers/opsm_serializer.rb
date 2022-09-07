# == Schema Information
#
# Table name: opsms
#
#  id           :bigint           not null, primary key
#  limit        :integer          default(0)
#  price        :decimal(6, 2)    default(0.0)
#  smsable_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  operator_id  :bigint
#  smsable_id   :bigint
#
# Indexes
#
#  index_opsms_on_operator_id                  (operator_id)
#  index_opsms_on_smsable_type_and_smsable_id  (smsable_type,smsable_id)
#
class OpsmSerializer < ActiveModel::Serializer
  attributes :id, :limit, :price, :operator
end
