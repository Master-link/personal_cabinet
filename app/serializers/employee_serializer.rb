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
class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :crm, :name, :category
end
