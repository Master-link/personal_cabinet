class CreateClaims < ActiveRecord::Migration[6.1]
  def change
    create_table :claims do |t|
      t.references :client, foreign_key: true
      t.references :service, foreign_key: true
      t.references :tariff, foreign_key: true
      t.datetime :date_activation
      t.text :comment
      t.text :state, default: 'state_new'

      t.timestamps
    end
  end
end
