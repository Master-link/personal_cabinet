class CreateServiceBalances < ActiveRecord::Migration[6.1]
  def change
    create_table :service_balances do |t|
      t.references :client, foreign_key: true
      t.references :service, foreign_key: true
      t.decimal :balance, precision: 15, scale: 2, default: 0

      t.timestamps
    end

    add_index :service_balances, [:client_id, :service_id], unique: true
  end
end
