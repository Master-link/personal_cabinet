class AddTokenToUsersSignins < ActiveRecord::Migration[6.1]
  def change
    add_column :users_signins, :token, :text
  end
end
