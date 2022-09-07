# frozen_string_literal: true

module TaxophoneFilterScope
  extend ActiveSupport::Concern

  included do
    scope :jsonb_do_filter, lambda { |search_hash|
      where(search_hash.to_h.deep_symbolize_keys)
    }

    scope :filter_gte, lambda { |field, date|
      where("#{field} >= ?", date.beginning_of_day) if date.present?
    }
    scope :filter_lte, lambda { |field, date|
      where("#{field} <= ?", date.end_of_day) if date.present?
    }

    scope :analitic_order, lambda { |sort, order|
      case sort
      when 'user_id'
        Arel.sql("analitic_loggers.log->>'user_id' #{order}")
      when 'client_id'
        Arel.sql("analitic_loggers.log->>'client_id' #{order}")
      else
        Arel.sql("#{sort} #{order}")
      end
    }
  end
end
