# frozen_string_literal: true

# == Schema Information
#
# Table name: currencies
#
#  id               :bigint           not null, primary key
#  decimal_code     :string
#  fmt              :string
#  hexadecimal_code :string
#  iso4217_code     :string
#  iso4217_num      :integer
#  name             :string
#  symbol           :string
#  unicode_code     :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Currency < ApplicationRecord
  has_many :countries

  validates_presence_of :name, :symbol, :iso4217_code, :iso4217_num
  validates :symbol, uniqueness: true

  has_many :services
end
