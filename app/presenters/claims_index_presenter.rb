# frozen_string_literal: true

class ClaimsIndexPresenter < Presenter
  def as_json(*)
    {
      data: @object[:claims].map { |o| ClaimPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
