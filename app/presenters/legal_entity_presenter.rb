# frozen_string_literal: true

class LegalEntityPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name
    }
  end
end
