class CreateCrms < ActiveRecord::Migration[6.1]
  def up
    create_table(:crms) do |t|
      t.integer :crm, null: false, index: {unique: true}
      t.string :name
      t.timestamps
    end
  end

  def down 
    drop_table :crms
  end
end
