# frozen_string_literal: true

class PasswordsController < ApplicationController
  skip_before_action :authorize_request, only: %i[forgot reset]
  before_action :set_user, only: %i[reset]
  before_action :set_user_by_id, only: %i[set_new_password]

  def change_password
    passwords = PasswordValidator.new
    pw = change_password_params.to_h.symbolize_keys
    validate = passwords.call(change_password_params.to_h)
    unless validate.success?
      return json_response({
        message: validate.errors.messages.map { |e| e.text }.join(", ")
      },
        :unprocessable_entity)
    end
    unless current_user.authenticate(pw[:old_password])
      return json_response({message: "неправильно указан старый пароль"}, :unprocessable_entity)
    end

    current_user.reset_password!(pw[:password])
    current_user.clear_tokens!
    json_response("", :ok)
  end

  def set_new_password
    passwords = OnlyPasswordValidator.new
    pw = only_password_params.to_h.symbolize_keys
    validate = passwords.call(only_password_params.to_h)
    return json_response(validate.errors.to_h, :not_allowed) unless validate.success?

    @user.reset_password!(pw[:password])
    @user.clear_tokens!

    json_response "", :ok
  end

  def forgot
    user = User.find_by("email=? OR login=?", with_forgot_params[:reset_input], with_forgot_params[:reset_input])
    raise(StandardError, "Пользователь с таким email не зарегистрирован") if user.nil?

    user.generate_password_token!
    UserMailer.forgot(user).deliver_now
    json_response("ok")
  end

  def reset
    check_user_and_password
    password_has_been_resed

    @user.clear_tokens!

    UserMailer.reset(@user).deliver_now
    json_response("ok")
  end

  def reset_password
    user = User.find(reset_params[:id])
    user.generate_new_token!

    user.clear_tokens!

    UserMailer.forgot(user).deliver_now
    json_response("ok")
  end

  private

  def reset_params
    params.permit(
      :id
    )
  end

  def with_forgot_params
    params.require(:password).permit(
      :reset_input
    )
  end

  def with_params
    params.require(:password).permit(
      :email,
      :token,
      :password
    )
  end

  def change_password_params
    params.permit(
      :old_password,
      :password,
      :repeat_password
    )
  end

  def only_password_params
    params.permit(
      :user_id,
      :password
    )
  end

  def check_user_and_password
    json_response({message: "The link has been obsolete"}, :not_found) unless @user.password_token_valid?
  end

  def password_has_been_resed
    return json_response(@user.errors.full_messages, :not_found) unless @user.reset_password!(with_params[:password])
  end

  def set_user
    @user = User.find_by(reset_password_token: with_params[:token], email: with_params[:email])
  end

  def set_user_by_id
    @user = User.find(only_password_params[:user_id])
  end
end
