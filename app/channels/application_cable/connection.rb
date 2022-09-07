# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      reject_unauthorized_connection unless request.params['userToken'].present?
      current_user = AuthorizeSocket.new(request.params['userToken']).call[:user]
      reject_unauthorized_connection unless current_user.present?
      current_user
    end
  end
end
