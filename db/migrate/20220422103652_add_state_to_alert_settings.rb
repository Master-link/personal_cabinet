class AddStateToAlertSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :alert_settings, :state, :string, default: 'disabled'
  end
end
