class CreateOperators < ActiveRecord::Migration[6.1]
  # kind (операторы для ресурсов):
  #     1 - смс
  #     2 - callbot
  def change
    create_table :operators do |t|
      t.string :name
      t.string :title
      t.integer :kind

      t.timestamps
    end
  end
end
