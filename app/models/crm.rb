# frozen_string_literal: true

# == Schema Information
#
# Table name: crms
#
#  id         :bigint           not null, primary key
#  crm        :string           not null
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_crms_on_crm  (crm) UNIQUE
#
class Crm < ApplicationRecord
  validates_presence_of :crm
  has_and_belongs_to_many :users
  has_many :clients

  def jsonapi_serializer_class_name
    Old::CrmSerializer
  end
end
