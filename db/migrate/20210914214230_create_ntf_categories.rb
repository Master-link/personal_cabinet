# frozen_string_literal: true

class CreateNtfCategories < ActiveRecord::Migration[6.1]
  def up
    create_table :ntf_categories do |t|
      t.string :title
      t.timestamps
    end
    execute <<-EOSQL
      INSERT INTO ntf_categories (title, created_at, updated_at) VALUES ('documents', NOW(), NOW());
    EOSQL
  end

  def down
    drop_table :ntf_categories
  end
end
