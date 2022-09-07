# frozen_string_literal: true

# == Schema Information
#
# Table name: roles
#
#  id            :bigint           not null, primary key
#  name          :string
#  resource_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :bigint
#
# Indexes
#
#  index_roles_on_name                                    (name)
#  index_roles_on_name_and_resource_type_and_resource_id  (name,resource_type,resource_id)
#  index_roles_on_resource_type_and_resource_id           (resource_type,resource_id)
#
class Role < ApplicationRecord
  has_and_belongs_to_many :users, join_table: :users_roles

  has_and_belongs_to_many :resolutions
  belongs_to :resource,
    polymorphic: true,
    optional: true

  validates :resource_type,
    inclusion: {in: Rolify.resource_types},
    allow_nil: true

  ROLE_ADMIN = "admin"
  ROLE_MANAGER = "manager"
  ROLE_OBSERVER = "observer"

  ROLE_CLIENT = "client"
  ROLE_DIRECTOR = "director"
  ROLE_EMPLOYEE = "employee"

  ROLE_Q_AND_A_FORBIDDEN = "q_and_a_forbidden"
  ROLE_Q_AND_A_READ_ONLY = "q_and_a_read_only"
  ROLE_SUPPORT = "support"

  ALL_ROLES = [Role::ROLE_ADMIN,
    Role::ROLE_CLIENT,
    Role::ROLE_DIRECTOR,
    Role::ROLE_EMPLOYEE,
    Role::ROLE_MANAGER,
    Role::ROLE_OBSERVER,
    Role::ROLE_Q_AND_A_FORBIDDEN,
    Role::ROLE_Q_AND_A_READ_ONLY,
    Role::ROLE_SUPPORT].freeze

  LEVEL_ZERO_ROLES = [Role::ROLE_ADMIN, Role::ROLE_MANAGER, Role::ROLE_OBSERVER].freeze
  LEVEL_ONE_ROLES = [Role::ROLE_CLIENT, Role::ROLE_DIRECTOR, Role::ROLE_EMPLOYEE].freeze

  MAIN_ROLES = (LEVEL_ZERO_ROLES + LEVEL_ONE_ROLES).freeze

  def self.current_user_has_top_roles(user)
    user.has_role?(ROLE_ADMIN) || user.has_role?(ROLE_MANAGER) || user.has_role?(ROLE_OBSERVER)
  end

  scopify
end
