class CreateClients < ActiveRecord::Migration[6.1]
  def change
    create_table :clients do |t|
      t.references :country, foreign_key: true
      t.integer :crm_id
      t.string :name
      t.string :email
      t.text :organization
      t.references :user, foreign_key: true
      t.integer :platform_client_id
      t.json :settings, :default =>  {"alert_emails":"", "alert_phone":"", "utc_offset": nil, "one_c_id": ""}
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :clients, :deleted_at
  end
end