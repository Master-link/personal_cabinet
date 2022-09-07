# frozen_string_literal: true

module HttpAdapters
  class Faraday
    def initialize(args)
      @conn = ::Faraday.new(url: args.fetch(:url)) do |conn|
        conn.request :json

        conn.response :json, content_type: /\bjson$/

        conn.use :instrumentation
        conn.adapter ::Faraday.default_adapter
      end
    end

    def get_request(url, params = nil, headers = nil)
      response = _get_request(url, params, headers)
      { status: response.status, body: response.body }
    end

    def post_request(url, body, headers)
      response = _post_request(url, body, headers)
      { status: response.status, body: response.body }
    end

    private

    def _get_request(url, params = nil, headers = nil)
      @conn.get do |req|
        req.url url
        req.params = params if params
        req.headers = headers if headers
      end

    rescue StandardError => e
      raise StandardError, e.message
    end


    def _post_request(url, body,  headers)
      @conn.post do |req|
        req.url url
        req.body = body
        req.headers = headers if headers
      end
    rescue StandardError => e
      raise StandardError, e.message
    end

  end
end
