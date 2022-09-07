# frozen_string_literal: true

# A Documents index presenter
class DocumentsIndexPresenter < Presenter
  def as_json(*)
    {
      documents: @object[:documents].map { |o| DocumentPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
