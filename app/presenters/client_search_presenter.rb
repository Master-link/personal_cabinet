# frozen_string_literal: true

class ClientSearchPresenter < Presenter
  def as_json(*)
    {
      data: @object[:clients].map { |o| ClientCrmPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
