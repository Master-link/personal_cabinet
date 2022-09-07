class CreateResolutionRole < ActiveRecord::Migration[6.1]
  def up
    create_table(:resolutions_roles, :id=>false) do |t|
      t.references :role, foreign_key: true
      t.references :resolution, foreign_key: true
    end

    add_index :resolutions_roles, [:role_id, :resolution_id], unique: true
  end

  def down
    drop_table :resolutions_roles
  end
end
