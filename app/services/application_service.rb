# frozen_string_literal: true

# a common service
class ApplicationService
  include Dry::Monads[:result, :do, :try]

  def self.call(*args, &block)
    new(*args, &block).call
  end
end
