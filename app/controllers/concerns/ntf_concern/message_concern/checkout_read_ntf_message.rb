# frozen_string_literal: true

module NtfConcern
  module MessageConcern
    module CheckoutReadNtfMessage
      def checkout_messages(user_id, ntf_messages)
        ntf_messages.each do |ntf_message|
          ntf_message.read["users"] << user_id
          ntf_message.read["users"].uniq!
          ntf_message.save
        end
      end

      def add_message(category_id, message, link)
        ::Ntf::Message.create(category_id: category_id, message: message, link: link)
      end

      def add_message_for_users(users, category_id, message, link)
        ::Ntf::Message.create(spread: {users: users}, category_id: category_id, message: message, link: link)
      end
    end
  end
end
