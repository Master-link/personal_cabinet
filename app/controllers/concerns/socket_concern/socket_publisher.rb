# frozen_string_literal: true

module SocketConcern
  module SocketPublisher
    def cable_publish(message)
      ActionCable.server.broadcast("LkMessages", {message: message})
    end

    def cable_publish_for_users(user_ids, message)
      user_ids.each do |user_id|
        ActionCable.server.broadcast("LkMessages:#{user_id}", {message: message})
      end
    end
  end
end
