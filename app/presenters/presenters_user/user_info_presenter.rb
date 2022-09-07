# frozen_string_literal: true

# A PresentersUser
module PresentersUser
  # An UserInfoPresenter
  class UserInfoPresenter < Presenter
    def as_json(*)
      {
        user: {
          email: @object.email,
          employees: @object.employees,
          id: @object.id,
          login: @object.login,
          name: @object.name,
          phone_number: @object.phone_number,
          role: @object.role,
          roles: @object.roles.uniq.sort_by { |key| key['id'] }.map { |o| RolePresenter.new(o) },
          sign_in_count: @object.sign_in_count,
          user_role: @object.user_role,
          primary_roles: @object.primary_roles?,
          client_id: @object&.crms&.first&.clients&.first&.id
        }
      }
    end
  end
end
