# frozen_string_literal: true

# A PresentersUser
module PresentersUser
  # ClientShortPresenter
  class ClientShortPresenter < Presenter
    def as_json(*)
      {
        client: {
          id: @object.id,
          client_requisite: @object.client_requisite,
          settings: @object.settings,
          name: @object.name,
          email: @object.email,
          organization: @object.organization,
          crm: {
            crm: @object.crm&.crm
          },
          user: {
            name: @object.users.present? ? @object.users.first.name : nil
          }
        }
      }
    end
  end
end
