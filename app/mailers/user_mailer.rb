# frozen_string_literal: true

# a mailer
class UserMailer < ApplicationMailer
  default from: APP_CONFIG['mail_from_host'],
          reply_to: APP_CONFIG['mail_reply'],
          return_path: APP_CONFIG['mail_return_path']

  def forgot(user)
    @user = user
    @href = "#{APP_CONFIG['frontend']}#{APP_CONFIG['change_password']}?token=#{@user.reset_password_token}&email=#{@user.email}"

    mail(to: @user.email, subject: 'Запрос на изменение пароля')
  end

  def reset(user)
    @user = user
    mail(to: @user.email, subject: 'Изменение пароля')
  end
end
