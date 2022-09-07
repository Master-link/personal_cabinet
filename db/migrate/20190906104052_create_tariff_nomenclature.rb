class CreateTariffNomenclature < ActiveRecord::Migration[6.1]
  def change
    create_table :nomenclatures_tariffs do |t|
      t.references :tariff, foreign_key: true, dependent: :destroy, index: {unique: true}
      t.references :nomenclature, foreign_key: true
    end
  end
end
