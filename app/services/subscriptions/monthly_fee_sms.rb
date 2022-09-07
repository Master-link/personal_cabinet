# frozen_string_literal: true

# Subscriptions
module Subscriptions
  class MonthlyFeeSms < ApplicationService
    def initialize(args)
      @subscription = args.fetch(:subscription)
      @has_monthly_fee = @subscription.jsondata["monthly_fee"]
    end

    def call
      ActiveRecord::Base.transaction do
        @subscription.service_balance.balance -= @has_monthly_fee.to_i
        @subscription.service_balance.save
        make_transaction
      end
      @subscription.suspended! if @subscription.service_balance.balance < @subscription.kredit_limit
      true
    rescue => e
      ::Rails.logger.error e.message
      ::Rails.logger.error e.backtrace.join("\n")
      false
    end

    private

    def make_transaction
      Transaction.create!(
        client_id: @subscription.client_id,
        subscription_id: @subscription.id,
        service_id: @subscription.tariff.service.id,
        user_id: nil,
        money: -@has_monthly_fee.to_i,
        source: 1,
        detail: {ip: @ip, comment: "Ежемесячное списание за SenderID"}
      )
    end
  end
end
