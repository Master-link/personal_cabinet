# frozen_string_literal: true

# == Schema Information
#
# Table name: employees_users
#
#  employee_id :bigint
#  user_id     :bigint
#
# Indexes
#
#  index_employees_users_on_employee_id  (employee_id)
#  index_employees_users_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (employee_id => employees.id)
#  fk_rails_...  (user_id => users.id)
#
class EmployeeUser < ApplicationRecord
  self.table_name = 'employees_users'

  belongs_to :employee
  belongs_to :user
end
