class CreateTransactions < ActiveRecord::Migration[6.1]
  def up
    create_table :transactions do |t|
      t.references :client, foreign_key: true
      t.references :subscription, foreign_key: true, null: true
      t.references :service, foreign_key: true
      t.references :user, foreign_key: true, null: true
      t.string :one_c_id
      t.decimal :money, null: false, precision: 15, scale: 2
      t.integer :source, null: false
      t.json :detail

      t.timestamps
    end
  end

  def down
    drop_table :transactions
  end
end
