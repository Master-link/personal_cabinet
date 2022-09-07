module Subscriptions
  class Suspend < ApplicationService
    def initialize(args)
      @subscription = Subscription.find(args.fetch(:subscription_id))
    end

    def call
      @subscription.suspended!
    rescue => e
      raise "Unavailable move transition #{@subscription.id} to suspended: #{e.message}"
    end
  end
end
