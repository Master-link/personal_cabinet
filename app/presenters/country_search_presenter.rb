# frozen_string_literal: true

class CountrySearchPresenter < Presenter
  def as_json(*)
    {
      data: @object[:countries].map { |o| CountryPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
