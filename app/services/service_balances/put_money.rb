# frozen_string_literal: true

module ServiceBalances
  # a service
  class PutMoney < ApplicationService
    def initialize(args)
      @service_balance = args.fetch(:service_balance)
      @current_user_id = args.fetch(:current_user_id, nil)
      @balance = args.fetch(:balance, 0)
      @source = args.fetch(:source, 1)
      @ip = args.fetch(:ip, "0.0.0.0")
      @comment = args.fetch(:comment, "")
      @do_transaction = args.fetch(:do_transaction, true)
    end

    def call
      ActiveRecord::Base.transaction do
        @service_balance.update!(balance: @service_balance[:balance] + @balance)
        make_transaction if @do_transaction
        @service_balance[:balance]
      end
    end

    private

    def make_transaction
      Transaction.create!(
        client_id: @service_balance[:client_id],
        service_id: @service_balance[:service_id],
        user_id: @current_user_id,
        money: @balance,
        source: @source,
        detail: {ip: @ip, comment: @comment}
      ) # if @balance > 0
    end
  end
end
