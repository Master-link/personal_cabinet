class DeleteExtraFieldsFromAlertSettings < ActiveRecord::Migration[6.1]
  def up
    remove_column :alert_settings, :alias
    remove_column :alert_settings, :service_id
    remove_column :alert_settings, :settings
    add_index :alert_settings, [:client_id, :alert_type], unique: true
  end

  def down
    add_column :alert_settings, :alias, :string
    add_reference :alert_settings, :service, foreign_key: true, index: false
    add_column :alert_settings, :settings, :json, :default => {}
    add_index :alert_settings, :alias
    add_index :alert_settings, :service_id
    add_index :alert_settings, [:client_id, :service_id, :alias], unique: true
    remove_index :alert_settings, name: "index_alert_settings_on_client_id_and_alert_type"
  end
end
