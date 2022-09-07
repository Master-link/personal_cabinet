class CreateAlertSettings < ActiveRecord::Migration[6.1]
  def up
    create_table :alert_settings do |t|
      t.string :name # название напоминания
      t.string :alias # алиас для связи с клиентом и сервисом
      t.references :client, foreign_key: true
      t.references :service, foreign_key: true
      # t.column :alert_type, :alert_types_type
      # t.integer :alert_type, null: false
      t.boolean :email_enabled, default: false
      t.boolean :sms_enabled, default: false
      t.json :settings, :default => {}

      t.timestamps
    end

    add_index(:alert_settings, :alias)
    add_index :alert_settings, [:client_id, :service_id, :alias], unique: true

  end

  def down 
    drop_table :alert_settings;
  end
end
