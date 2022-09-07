# frozen_string_literal: true

# a library of a webtoken
class JsonWebToken
  HMAC_SECRET = AppRails::Application.credentials.secret_key_base || Rails.application.secrets.secret_key_base

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:iat] = exp.to_i
    payload[:exp] = exp.to_i
    JWT.encode(payload, HMAC_SECRET)
  end

  def self.decode(token)
    body = JWT.decode(token, HMAC_SECRET)[0]
    HashWithIndifferentAccess.new body
  rescue JWT::DecodeError => _e
    raise ExceptionHandler::InvalidToken, Message.signature_verification_raised
  end
end
