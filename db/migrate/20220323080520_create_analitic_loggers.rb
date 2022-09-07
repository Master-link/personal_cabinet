class CreateAnaliticLoggers < ActiveRecord::Migration[6.1]
  def change
    create_table :analitic_loggers do |t|
      t.string :name
      t.jsonb :log, default: {}

      t.timestamps
    end
  end
end
