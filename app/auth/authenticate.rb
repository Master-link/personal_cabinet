# frozen_string_literal: true

# Authenticate
class Authenticate
  attr_accessor :token

  def initialize(email_login, password)
    @email_login = email_login
    @password = password
    @user = User.find_by('email=? OR login=?', email_login, email_login)
  end

  # Service entry point
  def call
    roles = user.roles.map(&:name)
    @token = JsonWebToken.encode({ user_id: user.id, username: user.name, roles: roles, email: user.email }) if user
    @token
  end

  def recount_signin!
    @user.increment!(:sign_in_count, 1)
  end

  def create_user_sign_in
    UsersSignin.create(user: @user, token: @token)
  end

  private

  attr_reader :email, :password

  def user
    return @user if @user&.authenticate(password)

    raise Message.not_valid_email_or_password
  end
end
