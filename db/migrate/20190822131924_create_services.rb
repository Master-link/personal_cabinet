class CreateServices < ActiveRecord::Migration[6.1]
  def change
    create_table :services do |t|
      t.references :currency, foreign_key: true
      t.references :legal_entity, foreign_key: true
      t.string  :name
      t.string  :state
      t.string  :alert_template_email
      t.string  :alert_template_sms
      t.integer :notify_expires_days
      t.json    :ticket, :default =>  {}
      t.timestamps
    end
  end
end
