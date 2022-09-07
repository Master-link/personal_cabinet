# frozen_string_literal: true

class NomenclatureSearchPresenter < Presenter
  def as_json(*)
    {
      data: @object[:nomenclatures].map { |o| NomenclaturePresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
