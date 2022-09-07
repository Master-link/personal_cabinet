# frozen_string_literal: true

class ClientsPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      email: @object.email,
      organization: @object.organization,
      tehsupport_hours: @object.settings['tehsupport_hours'],
      count_subscriptions: @object.has_attribute?('subscriptions_count') && @object.subscriptions_count,
      crm: {
        crm: @object.crm.present? ? @object.crm.crm : nil
      }
    }
  end
end
