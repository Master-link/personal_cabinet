# frozen_string_literal: true

# A UserMnpPresenter presenter
class UserMnpPresenter < Presenter
  def as_json(*)
    { 
      data: {
        id: @object[:user][:id],
        attributes: {
          crm_extid: @object[:user].crms.first.present? ? @object[:user].crms.first.crm : nil,
          name: @object[:user][:name],
          login: @object[:user][:login],
          role_id: @object[:user].roles.present? ? @object[:user].roles.first.id : nil,
          email: @object[:user][:email],
          phone_number: @object[:user][:phone_number]
        }
      }
    }
  end
end
