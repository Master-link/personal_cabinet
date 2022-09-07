# frozen_string_literal: true

module Subscriptions
  class Clone < ApplicationService
    def initialize(args)
      @subscription = args.fetch(:subscription)
      @notify_by_email = args.fetch(:notify_by_email, false)
    end

    def call
      ActiveRecord::Base.transaction do
        clone = @subscription.dup
        clone.state = nil
        subscription = Subscription.create!(clone.attributes)
        puts "Subscription with ID: #{subscription.id} has been cloned"
        subscription
      end
    end
  end
end
