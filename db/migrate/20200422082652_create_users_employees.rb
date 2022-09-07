class CreateUsersEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table(:employees_users, :id => false) do |t|
      t.references :user, foreign_key: true
      t.references :employee, foreign_key: true
    end
  end
end
