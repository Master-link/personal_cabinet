# frozen_string_literal: true

class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: %i[authenticate refresh_token]

  def authenticate
    auth_user = AuthenticateUser.new(auth_params[:email], auth_params[:password])
    auth_token = auth_user.call

    auth_user.recount_signin!
    auth_user.create_user_sign_in

    json_response(token: auth_token)
  end

  def login_as_user
    auth_user = AuthenticateUserAsLogin.new(auth_asuser_params[:id])
    auth_token = auth_user.call
    auth_user.create_user_sign_in if auth_token
    json_response(token: auth_token)
  end

  def refresh_token
    token = UsersSignin.find_by(refresh_token_params)
    return head 404 if token.nil?

    auth_user = AuthenticateUserAsLogin.new(refresh_token_params[:user_id])
    auth_token = auth_user.call

    auth_user.recount_signin!
    auth_user.create_user_sign_in

    json_response(token: auth_token)
  end

  private

  def auth_params
    params.permit(:email, :password)
  end

  def refresh_token_params
    params.permit(:user_id, :token)
  end

  def auth_asuser_params
    params.permit(:id)
  end
end
