module Subscriptions
  # сервис для восстановления подписки из например: приостановленного состояния
  class Activate < ApplicationService
    def initialize(args)
      @subscription = Subscription.find(args.fetch(:subscription_id))
    end

    def call
      @subscription.activated!
      rescue StandardError => e
        raise "Unavailable move transition #{@subscription.id} to activated: #{e.message}"
    end

  end
end