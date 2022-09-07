# frozen_string_literal: true

class TaxophoneVtmPresenter < Presenter
  def as_json(*)
    {
      id: @object["id"],
      name: @object["title"]
    }
  end
end
