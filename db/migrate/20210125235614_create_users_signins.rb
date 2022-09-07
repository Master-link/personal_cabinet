class CreateUsersSignins < ActiveRecord::Migration[6.1]
  def change
    create_table :users_signins do |t|
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
