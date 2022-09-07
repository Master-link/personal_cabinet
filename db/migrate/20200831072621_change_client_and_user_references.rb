# frozen_string_literal: true

class ChangeClientAndUserReferences < ActiveRecord::Migration[6.1]
  def up
    add_reference :clients, :employee, foreign_key: true
    execute <<-SQL
      UPDATE "clients"
      SET "employee_id" = "employees"."id"
      FROM "employees"
        INNER JOIN "employees_users"
          ON "employees"."id" = "employees_users"."employee_id"
      WHERE "employees_users"."user_id" = "clients"."user_id";
    SQL
    remove_reference :clients, :user, foreign_key: true
  end

  def down
    add_reference :clients, :user, foreign_key: true
    execute <<-SQL
      UPDATE "clients"
      SET "user_id" = "users"."id"
      FROM "users"
        INNER JOIN "employees_users"
          ON "users"."id" = "employees_users"."user_id"
      WHERE "employees_users"."employee_id" = "clients"."employee_id";
    SQL
    remove_reference :clients, :employee, foreign_key: true
  end
end
