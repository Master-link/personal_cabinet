# frozen_string_literal: true

module ServiceBalances
  class SubtractMoney < ApplicationService
    def initialize(args)
      @service_balance = args.fetch(:service_balance)
      @balance = args.fetch(:balance)
    end

    def call
      ActiveRecord::Base.transaction do
        @service_balance.update!(balance: @service_balance[:balance] - @balance)
        @service_balance[:balance]
        return @service_balance
      end
    end
  end
end
