# frozen_string_literal: true

module Users
  class ManageQandaRoles < ApplicationService
    def initialize(args)
      @client_id = args.fetch(:client_id)
      @role = args.fetch(:role)
    end

    def call
      users = get_users || []

      role = case @role
             when Role::ROLE_Q_AND_A_FORBIDDEN
               Role.find_by(name: Role::ROLE_Q_AND_A_FORBIDDEN)
             when Role::ROLE_Q_AND_A_READ_ONLY
               Role.find_by(name: Role::ROLE_Q_AND_A_READ_ONLY)
      end

      users.each do |user|
        user.remove_role Role::ROLE_Q_AND_A_FORBIDDEN
        user.remove_role Role::ROLE_Q_AND_A_READ_ONLY
        user.roles << role if role.present?
      end
    end

    private

    def get_users
      Client.find(@client_id).crm.users
    end
  end
end
