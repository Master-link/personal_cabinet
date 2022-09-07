class CreateCrmUser < ActiveRecord::Migration[6.1]
  def up
    create_table(:crms_users, :id=>false) do |t|
      t.references :crm, foreign_key: true
      t.references :user, foreign_key: true
    end

    add_index :crms_users, [:crm_id, :user_id], unique: true

  end

  def down 
    drop_table :crms_users
  end
end
