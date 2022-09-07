# == Schema Information
#
# Table name: sentsms
#
#  id                 :bigint           not null, primary key
#  extid              :integer
#  login              :string
#  message            :string
#  operator           :string
#  phone_number       :string
#  routeid            :integer
#  status             :string
#  status_changed_at  :datetime
#  uid                :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  sms_consumption_id :bigint
#
# Indexes
#
#  index_sentsms_on_sms_consumption_id  (sms_consumption_id)
#
# Foreign Keys
#
#  fk_rails_...  (sms_consumption_id => sms_consumptions.id)
#
class Sentsm < ApplicationRecord
  include FilterScope
  belongs_to :sms_consumption
end
