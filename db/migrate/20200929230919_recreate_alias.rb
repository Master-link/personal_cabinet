class RecreateAlias < ActiveRecord::Migration[6.1]
  def up
    remove_index :alert_settings, name: "index_alert_settings_on_client_id_and_service_id_and_alias"
    add_index :alert_settings, [:client_id, :service_id, :alias, :alert_type], unique: true, name: "as_client_service_alias_at"
  end

  def down
    remove_index :alert_settings, name: "as_client_service_alias_at"
    add_index :alert_settings, [:client_id, :service_id, :alias], unique: true
  end
end
