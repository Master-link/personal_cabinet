class CreateSubscriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :subscriptions do |t|
      t.references :client, foreign_key: true
      t.references :tariff, foreign_key: true
      t.string :state
      t.integer :credit_limit
      t.json :jsondata, :default =>  {"renewal": false, "custom_payment": 0, "paid_on": nil}
      t.json :settings, :default =>  {}
      t.datetime :started_at
      t.datetime :ended_at

      t.timestamps
    end
  end
end
