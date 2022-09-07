class CreateTariffs < ActiveRecord::Migration[6.1]
  def change
    create_table :tariffs do |t|
      t.references :service, foreign_key: true
      t.string :name
      t.datetime :started_at
      t.datetime :ended_at
      t.string :kind
      t.string :duration_kind
      t.decimal :advance_payment, precision: 15, scale: 2
      t.json :settings, :default =>  {}
      t.json :extra, :default =>  {"allow_client_subscription":false, "allow_with_confirmation":false, "changeable":false}

      t.datetime :deleted_at
      t.timestamps
    end
    add_index :tariffs, :deleted_at
  end
end
