# frozen_string_literal: true

class ServicesForCrmPresenter < Presenter
  def as_json(*)
    {
      crm_id: @object[:data].crm.crm,
      client_id: @object[:data].id,
      subscriptions: @object[:data].subscriptions.map { |o| SubscriptionsServicePresenter.new(o) }
    }
  end
end
