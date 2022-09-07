# frozen_string_literal: true

# == Schema Information
#
# Table name: newaccounts
#
#  id               :bigint           not null, primary key
#  client_comment   :text
#  crm              :string
#  final_spend_time :integer
#  name             :text
#  spend_time       :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  appeal_id        :integer
#
class Newaccount < ApplicationRecord
  validates :final_spend_time, presence: true, on: %i[create]
  validates_length_of :name, minimum: 0, maximum: 5000, allow_blank: false
  validates_length_of :client_comment, minimum: 0, maximum: 5000, allow_blank: true
  validates_numericality_of :appeal_id, on: %i[create], allow_nil: true

  has_many :tmstats, dependent: :destroy
end
