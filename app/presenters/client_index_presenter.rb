# frozen_string_literal: true

class ClientIndexPresenter < Presenter
  def as_json(*)
    {
      clients: @object[:clients].map { |o| ClientsPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
