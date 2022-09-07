# frozen_string_literal: true

class OperatorsPresenter < Presenter
  def as_json(*)
    {
      data: @object[:operators].map { |o| OperatorPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
