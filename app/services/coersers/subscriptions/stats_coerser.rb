module Coersers
  module Subscriptions
    class StatsCoerser < ApplicationService
      def initialize(args)
        @logs = args.fetch(:logs)
      end

      def call
        @logs.map do |log|
          closed = log.log['terminated'] || []
          renewed = log.log['renewed'] || []
          { id: log.id, closed: closed.count, renewed: renewed.count, date: log.created_at }
        end
      end
    end
  end
end
