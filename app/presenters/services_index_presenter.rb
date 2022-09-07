# frozen_string_literal: true

class ServicesIndexPresenter < Presenter
  def as_json(*)
    {
      services: @object[:services].map { |o| ServiceMainPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
