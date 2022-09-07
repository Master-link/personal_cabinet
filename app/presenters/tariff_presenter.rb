# frozen_string_literal: true

# A tariff presenter
class TariffPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name
    }
  end
end
