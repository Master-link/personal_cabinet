# frozen_string_literal: true

module Subscriptions
  class Activator < ApplicationService
    def initialize(args)
      @subscription = args.fetch(:subscription)
      @user_id = args.fetch(:user_id, nil)
      @transaction_type = args.fetch(:transaction_type)
      @ip = args.fetch(:ip)
    end

    def call
      return false unless [Subscription::STATE_NEW, Subscription::STATE_RENEWAL].include? @subscription.state.to_sym
      return false unless @subscription.can_activate?

      ActiveRecord::Base.transaction do |t|
        @subscription.activated!

        @subscription
          .tariff
          .service
          .service_balances
          .find_by(client_id: @subscription.client_id).subtract_balance!(
            @subscription.common_payment_value
          )
        make_transaction
        # TODO: send email
        return true
      rescue => e
        t.rollback
        logger.error e.message
        logger.error e.backtrace.join("\n")
        return false
      end
    end

    private

    def make_transaction
      return unless @subscription.common_payment_value != 0

      Transaction.create!(
        client_id: @subscription.client_id,
        subscription_id: @subscription.id,
        service_id: @subscription.tariff.service.id,
        user_id: @user_id,
        money: -@subscription.common_payment_value,
        source: @transaction_type,
        detail: {ip: @ip}
      )
    end
  end
end
