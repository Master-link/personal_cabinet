# frozen_string_literal: true

module V1
  class PagesController < ApplicationController
    skip_before_action :authorize_request

    def index
      json_response(
        message: "OK"
      )
    end

    def monitoring_check
      json_response("ok")
    end
  end
end
