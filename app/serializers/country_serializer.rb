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
class CountrySerializer < ActiveModel::Serializer
  attributes :id, :name, :phone_code
end
