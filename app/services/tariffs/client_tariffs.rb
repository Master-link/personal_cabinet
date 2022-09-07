# frozen_string_literal: true

# Services
module Tariffs
  # ClientTariffs
  class ClientTariffs < ApplicationService
    attr_accessor :user, :client_id, :service_id

    def initialize(args)
      @user = args.fetch(:user)
      @client_id = args.fetch(:client_id)
      @service_id = args.fetch(:service_id)
    end

    def call
      return [] if fetch_client.blank? || fetch_service.blank?

      if user.primary_roles?
        fetch_service.tariffs
      else
        fetch_service.tariffs.client_available_tariffs
      end
    end

    private

    def fetch_client
      @fetch_client ||= Client.find_by(id: client_id)
    end

    def fetch_service
      @fetch_service ||= if user.primary_roles?
                           Service.find_by(id: service_id)
                         else
                           Service.client_services_for_cities(fetch_client).find_by(id: service_id)
                         end
    end
  end
end
