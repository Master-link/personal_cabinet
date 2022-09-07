# frozen_string_literal: true

class ServicesPresenter < Presenter
  def as_json(*)
    {
      services: @object[:services].map { |o| ServiceIndexPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
