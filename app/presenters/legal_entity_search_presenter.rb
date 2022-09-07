# frozen_string_literal: true

class LegalEntitySearchPresenter < Presenter
  def as_json(*)
    {
      data: @object[:legal_entities].map { |o| LegalEntityPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
