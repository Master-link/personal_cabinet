# frozen_string_literal: true

module Ntf
  # 1 message presenter
  class MessagePresenter < Presenter
    def as_json(*)
      {
        id: @object.id,
        message: @object.message,
        link: @object.link,
        created_at: @object.created_at,
        category: {
          title: @object.category.title
        }
      }
    end
  end
end
