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
# serializer
class CrmSerializer < ActiveModel::Serializer
  attributes :id, :name, :crm
end
