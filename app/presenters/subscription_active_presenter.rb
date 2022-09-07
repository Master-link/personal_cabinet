# frozen_string_literal: true

# l
class SubscriptionActivePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      jsondata: @object.jsondata,
      settings: @object.settings,
      tariff: {
        id: @object.tariff.id,
        name: @object.tariff.name,
        extra: @object.tariff.extra,
        settings: @object.tariff.settings,
        service: {
          id: @object.tariff.service.id,
          name: @object.tariff.service.name
        }
      }
    }
  end
end
