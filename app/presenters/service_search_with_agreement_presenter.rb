# frozen_string_literal: true

# A ServiceSearchPresenter presenter
class ServiceSearchWithAgreementPresenter < Presenter
  def as_json(*)
    {
      data: @object[:services].map { |o| ClaimServicePresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
