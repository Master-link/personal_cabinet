# frozen_string_literal: true

module Subscriptions
  class Renew < ApplicationService
    def initialize(args)
      @subscription = args.fetch(:subscription)
      @notify_by_email = args.fetch(:notify_by_email, false)
    end

    def call
      return unless @subscription.may_renewed? # &&  @subscription.may_activated?

      ActiveRecord::Base.transaction do
        @subscription.renewed!
        renewal_subscription if @notify_by_email
      end
    end

    private

    def renewal_subscription
      SubscriptionMailer.with(subscription: @subscription).renewal_subscription.deliver_now
    end
  end
end
