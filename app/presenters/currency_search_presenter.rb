# frozen_string_literal: true

class CurrencySearchPresenter < Presenter
  def as_json(*)
    {
      data: @object[:currencies].map { |o| CurrencyPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
