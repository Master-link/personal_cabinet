class AddSettingToAlertSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :alert_settings, :setting, :jsonb, default: {}
  end
end
