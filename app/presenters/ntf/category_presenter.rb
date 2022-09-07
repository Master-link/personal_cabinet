# frozen_string_literal: true

module Ntf
  # 1 message presenter
  class CategoryPresenter < Presenter
    def as_json(*)
      {
        id: @object.id,
        title: @object.title
      }
    end
  end
end
