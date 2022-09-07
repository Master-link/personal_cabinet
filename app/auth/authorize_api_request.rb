# frozen_string_literal: true

# An AuthApi class
class AuthorizeApiRequest
  def initialize(headers = {})
    @headers = headers
  end

  def call
    {
      user: user
    }
  end

  private

  attr_reader :headers

  def user
    @user ||= User.includes(:roles).find(decoded_auth_token?[:user_id])
  end

  def decoded_auth_token?
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    return headers["Authorization"].split.last if headers["Authorization"].present?

    raise(ExceptionHandler::MissingToken, Message.missing_token)
  end
end
