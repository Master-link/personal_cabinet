# frozen_string_literal: true

module Logging
  class Middleware
    attr_reader :app

    def initialize(app)
      @app = app
    end

    def call(env)
      Logging.mdc['request_id'] = env["action_dispatch.request_id"]
      app.call(env)
    ensure
      Logging.mdc.clear
    end
  end
end
