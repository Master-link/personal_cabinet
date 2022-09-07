# frozen_string_literal: true

# a library of Messages
class Message
  def self.not_found(record = 'Запись')
    "#{record} не найдена"
  end

  def self.invalid_credentials
    'Ограниченный доступ'
  end

  def self.invalid_token
    'Неправильный токен'
  end

  def self.missing_token
    'Пропущен токен в запросе'
  end

  def self.unauthorized
    'Нужна предварительная авторизация'
  end

  def self.forbidden
    'Запрещенная операция'
  end

  def self.account_created
    'Успешное создание аккаунта'
  end

  def self.account_not_created
    'Ошибка создания аккаунта'
  end

  def self.expired_token
    'Просрочен токен'
  end

  def self.not_valid_email_or_password
    'Логин или пароль не корректны'
  end

  def self.signature_verification_raised
    'Устарел токен'
  end
end
