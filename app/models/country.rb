# frozen_string_literal: true

# == Schema Information
#
# Table name: countries
#
#  id          :bigint           not null, primary key
#  crmcountry  :integer
#  deleted_at  :datetime
#  name        :string
#  phone_code  :string
#  currency_id :integer
#
# Indexes
#
#  index_countries_on_deleted_at  (deleted_at)
#
# Foreign Keys
#
#  countries_currency_id_fkey  (currency_id => currencies.id)
#
class Country < ApplicationRecord
  acts_as_paranoid

  has_many :clients

  belongs_to :currency, optional: true
  has_many :geographies
  has_many :services, through: :geographies

  validates_presence_of :name
  validates :name, uniqueness: true

  def jsonapi_serializer_class_name
    Old::CountrySerializer
  end
end
