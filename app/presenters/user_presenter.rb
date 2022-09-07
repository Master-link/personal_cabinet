# frozen_string_literal: true

# A user presenter
class UserPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      login: @object.login,
      phone_number: @object.phone_number,
      email: @object.email,
      roles: @object.roles.sort_by { |key| key["id"] }.map { |o| RolePresenter.new(o) },
      sign_in_count: @object.sign_in_count,
      crm: @object.crms.present? ? @object.crms.first.crm : nil
    }
  end
end
