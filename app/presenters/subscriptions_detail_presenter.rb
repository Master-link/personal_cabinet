# frozen_string_literal: true

# A SubscriptionPresenter presenter
class SubscriptionsDetailPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      state: @object.state,
      jsondata: @object.jsondata,
      started_at: @object.started_at,
      ended_at: @object.ended_at,
      tariff: {
        id: @object.tariff.id,
        name: @object.tariff.name
      },
      client: {
        id: @object.client.id,
        name: @object.client.name
      }
    }
  end
end
