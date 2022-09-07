# frozen_string_literal: true

class BaseThor < Thor
  private

  def commit?
    options[:commit]
  end

  def parse_date_args
    date    = options[:date] ? Time.parse(options[:date]).to_datetime : nil
    date_to = options[:date_to] ? Time.parse(options[:date_to]).to_datetime : nil

    [date, date_to]
  end

  def get_client_ids(date, kind)
    client_ids = if options[:client_id]
                   options[:client_id].split(',')
                 else
                   services_ids = Service.where(kind: kind).pluck(:id)
                   Subscription
                     .by_service_id(services_ids)
                     .active_on_date(date.end_of_month, service_id: services_ids).pluck(:client_id)
    end

    client_ids.uniq
  end
end
