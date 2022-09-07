# frozen_string_literal: true

module Documents
  module Gr
    class GenerateActs < ApplicationService
      def initialize(args)
        @from = args.fetch(:from)
        @to = args.fetch(:to)
        @logger = Logger.new("#{Rails.root}/log/generate_month_gr_stat.log")
      end

      def call
        if DateTime.parse(@from) < Date.new(2020, 8, 1)
          error_message = "--"
          puts error_message
          @logger.error error_message
          return
        end

        clients_ids = CallbotConsumption.select(:client_id).where("period >= ? and period <= ?", @from, @to)
          .distinct.map(&:client_id).compact
        transaction_detail_type = "monthly_report"
        total = 0
        @logger.info "#{DateTime.now} - Found: #{clients_ids.count}"
        clients_ids.each do |client_id|
          consumption = CallbotConsumption.where(client_id: client_id)
            .where("period >= ? and period <= ?", @from, @to)
            .sum(:summ).to_f.round(2)
          consumption_count = CallbotConsumption.where(client_id: client_id)
            .where("period >= ? and period <= ?", @from, @to)
            .sum(:count)

          service = Subscription.find_by(
            client_id: client_id,
            tariff: Tariff.where(service: Service.where("ticket->>'kind' = ?", Service::KIND_CALLS_BOT))
          )&.service
          if service.present? && (consumption_count > 0 || Subscription.actives.where(service: service).count > 0)
            Transaction.where("detail->>'type' = ?", transaction_detail_type)
              .where("detail->>'from' = ?", @from)
              .where("detail->>'to' = ?", @to)
              .find_or_create_by(
                client_id: client_id,
                service: service,
                source: Transaction::SOURCE_CALLS_BOT
              ) do |new_transaction|
              new_transaction.money = -1 * consumption
              new_transaction.detail ||= {}
              new_transaction.detail["ip"] = "::1"
              # TODO: Возможно следует переделать `count_sms` в `count`
              new_transaction.detail["count_sms"] = consumption_count
              new_transaction.detail["type"] = transaction_detail_type
              new_transaction.detail["from"] = @from
              new_transaction.detail["to"] = @to
              new_transaction.detail["info"] = "голосовой робот от #{@from} до #{@to}"
              created_time = DateTime.parse(@from).next_month.beginning_of_month.beginning_of_day
              new_transaction.created_at = created_time
              new_transaction.updated_at = created_time

              total += 1
            end
          else
            @logger.warn "Service not found for Client##{client_id}"
          end
        end
        @logger.info "#{DateTime.now} - Written: #{total}"
      end
    end
  end
end
