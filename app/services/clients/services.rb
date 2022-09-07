# frozen_string_literal: true

module Clients
  # a service
  class Services < ApplicationService
    def initialize(args)
      @client = args.fetch(:client)
    end

    def call
      []
    end
  end
end
