# frozen_string_literal: true

module Subscriptions
  class RecountHours < ApplicationService
    def initialize(args)
      @subscription_id = args.fetch(:subscription_id)
      @hours = args.fetch(:hours, 0)
    end

    def call
      find_active_subscription
      recount_hours
    end

    private

    def find_active_subscription
      @subscription = Subscription.find(@subscription_id)
      raise "не активная подписка" unless @subscription.state_active?
      raise "баланс времени ушел в минус: #{@subscription.settings["hours"]}" if @subscription.settings["hours"] <= 0
    end

    def recount_hours
      @subscription.settings["hours"] += @hours
      @subscription.update!(settings: @subscription.settings)
    end
  end
end
