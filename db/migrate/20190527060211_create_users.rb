class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :login, index: {unique: true}
      t.string :email
      t.string :password_digest
      t.string :phone_number, index: {unique: true}, null: true
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.integer :sign_in_count, default: 0
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
