class CreateGeography < ActiveRecord::Migration[6.1]
  def change
    create_table :geographies do |t|
      t.references :service, foreign_key: true
      t.references :country, foreign_key: true
    end
    add_index :geographies, [:service_id, :country_id]
  end
end
