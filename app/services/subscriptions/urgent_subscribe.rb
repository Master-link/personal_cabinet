module Subscriptions
  class UrgentSubscribe < ApplicationService
    def initialize(args)
      @client = args.fetch(:client)
      @tariff = args.fetch(:tariff)
    end

    def call
      subscription = Subscription.new
      subscription.client = @client
      subscription.tariff = @tariff
      subscription.started_at = DateTime.now.beginning_of_day
      subscription.ended_at = @tariff.add_period(subscription.started_at)
      subscription.settings = @tariff.settings
      subscription.save!
      subscription
    rescue => e
      raise "Unavailable activate: #{e.message}"
    end
  end
end
