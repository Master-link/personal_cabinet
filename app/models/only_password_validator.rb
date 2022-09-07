# frozen_string_literal: true

class OnlyPasswordValidator < Dry::Validation::Contract
  config.messages.default_locale = :en

  PASWORD_REGEX = /\A[a-zA-Z0-9]+\z/i

  params do
    required(:password).value(:string)
  end

  rule(:password) do
    key.failure('an incorrect value: [a-zA-Z0-9]') unless PASWORD_REGEX.match?(values[:password])
  end
end
