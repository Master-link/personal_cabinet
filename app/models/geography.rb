# == Schema Information
#
# Table name: geographies
#
#  id         :bigint           not null, primary key
#  country_id :bigint
#  service_id :bigint
#
# Indexes
#
#  index_geographies_on_country_id                 (country_id)
#  index_geographies_on_service_id                 (service_id)
#  index_geographies_on_service_id_and_country_id  (service_id,country_id)
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (service_id => services.id)
#
class Geography < ApplicationRecord
  belongs_to :service, inverse_of: :geographies
  belongs_to :country, inverse_of: :geographies
end
