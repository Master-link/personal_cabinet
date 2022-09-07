class AddTariffsCountToServices < ActiveRecord::Migration[6.1]
  def change
    add_column :services, :tariffs_count, :integer, default: 0
  end
end
