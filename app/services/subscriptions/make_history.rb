# frozen_string_literal: true

module Subscriptions
  # a service
  class MakeHistory < ApplicationService
    def initialize(args)
      @subscription_id = args.fetch(:subscription_id)
    end

    def call
      clone = Subscription.find(@subscription_id).dup
      clone.state = Subscription::STATE_OUTDATED
      clone.save
    end
  end
end
