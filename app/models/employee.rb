# == Schema Information
#
# Table name: employees
#
#  id         :bigint           not null, primary key
#  category   :integer
#  crm        :integer
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Employee < ApplicationRecord
  has_many :clients
  has_and_belongs_to_many :users
end
