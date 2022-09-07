# frozen_string_literal: true

# ExceptionHandler
module ExceptionHandler
  extend ActiveSupport::Concern

  class AuthenticationError < StandardError; end

  class MissingToken < StandardError; end

  class InvalidToken < StandardError; end

  class DecodeError < StandardError; end

  class ExpiredSignature < StandardError; end

  class DecodeError < StandardError; end

  class NotFound < StandardError; end

  included do
    rescue_from StandardError, with: :four_twenty_two
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :unauthorized_request
    rescue_from CanCan::AccessDenied, with: :forbidden_request
    rescue_from ExceptionHandler::ExpiredSignature, with: :forbidden_request
    rescue_from ExceptionHandler::DecodeError, with: :forbidden_request
    rescue_from ExceptionHandler::NotFound, with: :not_found
  end

  private

  def four_twenty_two(error)
    logger.error error.message
    logger.error error.backtrace.join("\n")
    json_response({message: error.message}, :unprocessable_entity)
  end

  def unauthorized_request(error)
    json_response({message: error.message}, :unauthorized)
  end

  def forbidden_request(_error)
    json_response({message: Message.forbidden}, :forbidden)
  end

  def not_found(error)
    json_response({message: error.message}, :not_found)
  end
end
