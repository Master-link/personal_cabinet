# frozen_string_literal: true

module Ntf
  # array of messages
  class MessagesPresenter < Presenter
    def as_json(*)
      {
        messages: @object[:messages].map { |o| ::Ntf::MessagePresenter.new(o) },
        meta: @object[:meta]
      }
    end
  end
end
