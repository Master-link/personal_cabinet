# frozen_string_literal: true

# A TariffSearchSimplePresenter presenter
class TariffSearchSimplePresenter < Presenter
  def as_json(*)
    {
      data: @object[:tariffs].map { |o|
              {
                id: o.id,
                name: o.name,
                allow_client_subscription: o.extra["allow_client_subscription"],
                allow_with_confirmation: o.extra["allow_with_confirmation"]
              }
            },
      meta: @object[:meta]
    }
  end
end
