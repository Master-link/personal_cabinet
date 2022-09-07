# frozen_string_literal: true

class PasswordValidator < Dry::Validation::Contract
  config.messages.default_locale = :en

  PASWORD_REGEX = /\A[a-zA-Z0-9]+\z/i

  params do
    required(:old_password).value(:string)
    required(:password).value(:string)
    required(:repeat_password).value(:string)
  end

  rule(:old_password) do
    key.failure('a incorrect format: [a-zA-Z0-9]') unless PASWORD_REGEX.match?(values[:old_password])
  end
  rule(:password) do
    key.failure('Пароль должен содержать только символы: [a-zA-Z0-9]') unless PASWORD_REGEX.match?(values[:password])
    key.failure('Пароль и повтор пароля не одинаковые') if values[:password] != values[:repeat_password]
  end
  rule(:repeat_password) do
    unless PASWORD_REGEX.match?(values[:repeat_password])
      key.failure('Повтор пароля должен содержать только символы: [a-zA-Z0-9]')
    end
    key.failure('Пароль и повтор пароля не одинаковые') if values[:password] != values[:repeat_password]
  end
end
