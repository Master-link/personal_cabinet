# frozen_string_literal: true

module FilterScope
  extend ActiveSupport::Concern

  included do
    scope :do_filter, lambda { |search_hash|
      where(search_hash.to_h.deep_symbolize_keys)
    }

    # кастомный фильтр - только для доков
    scope :document_filter, lambda { |_search_hash|
      if _search_hash[:search].present?
        joins(client: :crm).where(
          'clients.name ilike :search OR crms.crm like :strict_search',
          search: "%#{_search_hash[:search]}%",
          strict_search: _search_hash[:search]
        )
      end
    }

    scope :array_of_jsons_or_integers_filter, lambda { |filtr|
      begin
        if filtr.present?

            parsed = JSON.parse(filtr)
            if parsed.is_a?(Array)
              str = parsed.map(&:symbolize_keys)
              array_ids = str.map{|x| x[:id]}.map(&:to_i)
            else
              array_ids = parsed.to_s.split(",").map(&:to_i)
            end

          where(client_id: array_ids) if array_ids.present?
        end
      rescue StandardError => _e;end
    }

    scope :filter_gte, lambda { |table, date|
      where("#{table}.created_at >= ?", date) if date.present?
    }
    scope :filter_lte, lambda { |table, date|
      where("#{table}.created_at <= ?", date) if date.present?
    }

    # для фильтрации по периоду
    scope :created_between, lambda { |period|
      if period.present?
        if period[:period][:gte].present? && period[:period][:lte].present?
          where('period >= ? AND period <= ?', period[:period][:gte], period[:period][:lte])
        elsif period[:period][:gte].present?
          where('period >= ?', period[:period][:gte])
        elsif period[:period][:lte].present?
          where('period <= ?', period[:period][:lte])
        end
      end
    }
  end
end
