# frozen_string_literal: true

# An AuthApi class
class AuthorizeSocket
  def initialize(token)
    @token = token
  end

  def call
    { user: user }
  end

  private

  def user
    @user ||= User.includes(:roles).find(decoded_auth_token?[:user_id]) if decoded_auth_token?
  end

  def decoded_auth_token?
    @decoded_auth_token ||= JsonWebToken.decode(@token)
  end
end
