# frozen_string_literal: true

# a TariffNomenclature model
class TariffNomenclature < ApplicationRecord
  belongs_to :tariff
  belongs_to :nomenclature
end
