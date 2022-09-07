# frozen_string_literal: true

# AuthenticateUserAsLogin
class AuthenticateUserAsLogin < Authenticate
  def initialize(id)
    super '', ''
    @user = User.find id
  end

  private

  attr_reader :email, :password, :user
end
