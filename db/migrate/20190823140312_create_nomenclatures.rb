class CreateNomenclatures < ActiveRecord::Migration[6.1]
  def change
    create_table :nomenclatures do |t|
      t.string :code
      t.string :name

      t.timestamps
    end
    add_index :nomenclatures, [:code], unique: true
  end
end
