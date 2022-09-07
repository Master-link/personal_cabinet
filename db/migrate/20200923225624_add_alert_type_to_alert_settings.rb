class AddAlertTypeToAlertSettings < ActiveRecord::Migration[6.1]
  def change
    # тип алерта
    add_column :alert_settings, :alert_type, :string

    # дата, когда было отправлено 1е уведомление
    add_column :alert_settings, :first_send_at, :datetime
    # дата, когда было отправлено уведомление в последний раз
    add_column :alert_settings, :last_send_at, :datetime
  end
end
