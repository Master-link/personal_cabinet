# frozen_string_literal: true

# Services
module Services
  # ClientServices
  class ClientServices < ApplicationService
    attr_accessor :user, :client

    def initialize(args)
      @user = args.fetch(:user)
      @client = args.fetch(:client)
    end

    def call
      if user.primary_roles?
        Service.all
      else
        Service.actual_for_client(client)
      end
    end
  end
end
