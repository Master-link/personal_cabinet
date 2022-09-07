# frozen_string_literal: true

class CountryPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name
    }
  end
end
