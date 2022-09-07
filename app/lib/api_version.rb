# frozen_string_literal: true

# a library of a version
class ApiVersion
  attr_reader :version, :default

  def initialize(version, default)
    @version = version
    @default = default || false
  end

  def matches?(request)
    check_headers(request.headers) || default
  end

  private

  def check_headers(headers)
    accept = headers[:accept]

    accept&.include?("application/vnd.newapi.#{version}+json")
  end
end
