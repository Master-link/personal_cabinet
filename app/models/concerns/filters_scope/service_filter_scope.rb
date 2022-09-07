module FiltersScope
  module ServiceFilterScope
    extend ActiveSupport::Concern

    included do
      scope :filter_by_name, lambda { |name|
        where('LOWER(services.name) like ?', "%#{name}%".downcase)
      }

      scope :filter_by_client_services_for_cities, lambda { |client_id|
        joins(:countries)
          .where(
            countries: {
              id: Client.find(client_id).country.id
            },
            state: 'active'
          )
          .where("services.ticket->>'allow_subscribe'='true'")
      }
    end
  end
end
