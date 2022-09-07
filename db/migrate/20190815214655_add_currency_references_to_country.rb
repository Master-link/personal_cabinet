class AddCurrencyReferencesToCountry < ActiveRecord::Migration[6.1]
  def change
    unless ActiveRecord::Base.connection.column_exists?(:countries, :currency_id)
      add_reference :countries, :currency, foreign_key: true, null: true
    end
  end
end
