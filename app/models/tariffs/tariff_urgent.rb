# frozen_string_literal: true

# == Schema Information
#
# Table name: tariffs
#
#  id              :bigint           not null, primary key
#  advance_payment :decimal(15, 2)
#  deleted_at      :datetime
#  duration_kind   :string
#  ended_at        :datetime
#  extra           :json
#  kind            :string
#  name            :string
#  settings        :json
#  started_at      :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  service_id      :bigint
#
# Indexes
#
#  index_tariffs_on_deleted_at  (deleted_at)
#  index_tariffs_on_service_id  (service_id)
#
# Foreign Keys
#
#  fk_rails_...  (service_id => services.id)
#
module Tariffs
  class TariffUrgent < Tariff
    # получение тарифов "Экстренная ТП" по стране - country_id
    scope :for_client_country, lambda { |country_id|
      joins(service: :countries)
        .extra_type_tariff(Tariff::EXTRA_URGENT_TARIFF)
        .where(countries: { id: country_id })
        .where(
          'tariffs.created_at <= ? AND (ended_at is null OR ended_at >=?)',
          DateTime.current.to_date,
          DateTime.current.to_date
        )
    }
  end
end
