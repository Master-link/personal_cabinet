# frozen_string_literal: true

# A ServiceSearchPresenter presenter
class ServiceSearchPresenter < Presenter
  def as_json(*)
    {
      data: @object[:services].map { |o| ServicePresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
