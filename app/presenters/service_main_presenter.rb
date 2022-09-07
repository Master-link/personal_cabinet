# frozen_string_literal: true

class ServiceMainPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      state: @object.state,
      currency: @object.currency,
    }
  end
end
