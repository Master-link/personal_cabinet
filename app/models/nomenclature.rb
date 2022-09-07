# frozen_string_literal: true

# == Schema Information
#
# Table name: nomenclatures
#
#  id         :bigint           not null, primary key
#  code       :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_nomenclatures_on_code  (code) UNIQUE
#
class Nomenclature < ApplicationRecord
  validates_presence_of :code, :name
  validates :code, uniqueness: true
end
