# frozen_string_literal: true

module Ntf
  # array of messages
  class CategoriesPresenter < Presenter
    def as_json(*)
      {
        categories: @object[:categories].map { |o| ::Ntf::CategoryPresenter.new(o) },
        meta: @object[:meta]
      }
    end
  end
end
