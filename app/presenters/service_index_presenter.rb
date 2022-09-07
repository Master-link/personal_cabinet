# frozen_string_literal: true

class ServiceIndexPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      state: @object.state,
      service_balances: @object.service_balances,
      currency: @object.currency,
      subscriptions: @object.subscriptions
    }
  end
end
