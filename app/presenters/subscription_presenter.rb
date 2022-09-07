# frozen_string_literal: true

# A SubscriptionPresenter presenter
class SubscriptionPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: "№#{@object.id}. #{@object.tariff.service.name} - #{@object.tariff.name}",
      tariff: {
        id: @object.tariff.id,
        name: @object.tariff.name
      }
    }
  end
end
