class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.integer :crm
      t.string :name
      t.integer :category

      t.timestamps
    end
  end
end
