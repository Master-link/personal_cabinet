# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  deleted_at             :datetime
#  email                  :string
#  login                  :string
#  name                   :string
#  password_digest        :string
#  phone_number           :string
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_login         (login) UNIQUE
#  index_users_on_phone_number  (phone_number) UNIQUE
#
# serializer
class UserSerializer < ActiveModel::Serializer
  # set_type :currency
  attributes :id,
             :name,
             :login,
             :phone_number,
             :email,
             :sign_in_count,
             :role,
             :user_role
  has_many :roles
  has_many :employees
end
