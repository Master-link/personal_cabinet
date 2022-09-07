module Subscriptions
  class ByServiceClient < ApplicationService
    def initialize(args)
      @subscription = Subscription.suspend_sms_by_client(service_id: args.fetch(:service_id))
    end

    def call
      @subscription.activated!
    rescue => e
      raise "Unavailable move transition #{@subscription.id} to activated: #{e.message}"
    end
  end
end
