# frozen_string_literal: true

# A SubscriptionPresenter presenter
class  SubscriptionsServicePresenter < Presenter
  def as_json(*)
    {
      service_id: @object.service.id,
      name: @object.service.name,
      kind: @object.service.ticket["kind"],
      tariff: @object.service.ticket["tariff"]
    }
  end
end
