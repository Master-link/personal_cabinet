# frozen_string_literal: true

module Subscriptions
  class IsCorrectHoursToBuy < ApplicationService
    def initialize(args)
      @client_id = args.fetch(:client_id)
      @hours = args.fetch(:hours)
      @amount = args.fetch(:amount)
    end

    def call
      active_subscription = Subscriptions::Tehsupport::Subscription
        .active_stp_by_client(@client_id).first
      return false unless active_subscription.present?

      if active_subscription.jsondata["new_tariff"]
        all_variants = active_subscription.tariff.extra["new_tariff_hours"]
        return all_variants.detect { |v| v["price"].to_i == @amount && v["name"].split[0].to_i == @hours }.present?
      end

      active_subscription.settings["overtime_price"].to_i * @hours == @amount
    rescue => e
      ::Rails.logger.error e.message
      ::Rails.logger.error e.backtrace.join("\n")
      false
    end
  end
end
