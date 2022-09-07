# frozen_string_literal: true

module HttpAdapters
  class NetHttp
    def initialize(args)
      @url = URI(args.fetch(:url))
    end

    def get_request(urn, params, headers = {})
      response = _get_request(urn, params, headers)
      OpenStruct.new(
        status: response.code.to_i,
        body: valid_json?(response.body) ? JSON.parse(response.body) : response.body,
        headers: response.to_hash
      )
    end

    def post_request(urn, body, headers = {})
      response = _post_request(urn, body, headers)
      OpenStruct.new(
        status: response.code.to_i,
        body: valid_json?(response.body) ? JSON.parse(response.body) : response.body,
        headers: response.to_hash
      )
    end

    def put_request(urn, body, headers)
      response = _patch_request(urn, body, headers)
      OpenStruct.new(
        status: response.code.to_i,
        body: valid_json?(response.body) ? JSON.parse(response.body) : response.body,
        headers: response.to_hash
      )
    end

    def patch_request(urn, body, headers)
      response = _patch_request(urn, body, headers)
      OpenStruct.new(
        status: response.code.to_i,
        body: valid_json?(response.body) ? JSON.parse(response.body) : response.body,
        headers: response.to_hash
      )
    end

    def delete_request(urn, params, headers = {})
      response = _delete_request(urn, params, headers)
      OpenStruct.new(
        status: response.code.to_i,
        body: valid_json?(response.body) ? JSON.parse(response.body) : response.body,
        headers: response.to_hash
      )
    end

    private

    def _get_request(urn, params = nil, headers)
      uri = URI("#{@url}#{urn}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true if uri.scheme === "https"
      uri.query = params.to_query if params.present?
      request = Net::HTTP::Get.new(uri)
      set_header!(request, headers)
      http.request(request)
    rescue StandardError => e
      raise StandardError, e.message
    end

    def _patch_request(urn, body, headers)
      uri = URI("#{@url}#{urn}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true if uri.scheme === "https"
      request = Net::HTTP::Patch.new(uri)
      set_header!(request, headers)
      request.body = body
      http.request(request)
    rescue StandardError => e
      raise StandardError, e.message
    end

    def _post_request(urn, body, headers)
      uri = URI("#{@url}#{urn}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true if uri.scheme === "https"
      request = Net::HTTP::Post.new(uri)
      set_header!(request, headers)
      request.set_form body, 'multipart/form-data'
      http.request(request)
    rescue StandardError => e
      raise StandardError, e.message
    end

    def _delete_request(urn, body = nil, headers)
      uri = URI("#{@url}#{urn}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true if uri.scheme === "https"
      request = Net::HTTP::Delete.new(uri)
      request.body = body
      set_header!(request, headers)
      http.request(request)
    rescue StandardError => e
      raise StandardError, e.message
    end

    def set_header!(request, headers)
      headers.each do |key, value|
        request[key] = value
      end
    end

    def valid_json?(json)
      JSON.parse(json)
      return true
    rescue JSON::ParserError => e
      return false
    end
  end
end
