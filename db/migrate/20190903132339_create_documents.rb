class CreateDocuments < ActiveRecord::Migration[6.1]
  def change
    create_table :documents do |t|
      t.references :client, foreign_key: true
      t.references :tariff, foreign_key: true
      t.integer :document_type, default: 0
      t.decimal :price, precision: 15, scale: 2, default: 0
      t.datetime :creation_datetime
      t.string :file_name

      t.timestamps
    end
  end
end
