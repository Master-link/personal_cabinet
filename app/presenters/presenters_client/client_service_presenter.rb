# frozen_string_literal: true

# PresentersClient
module PresentersClient
  # ClientServicePresenter
  class ClientServicePresenter < Presenter
    def as_json(*)
      {
        client: {
          id: @object[:client].id, name: @object[:client].name.to_s
        },
        services: @object[:services].map { |o| ServicePresenter.new(o) }
      }
    end
  end
end
