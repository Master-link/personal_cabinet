# frozen_string_literal: true

# V1
module V1
  module Ntf
    class MessagesController < ApplicationController
      include ::NtfConcern::MessageConcern::CheckoutReadNtfMessage
      authorize_resource class: "::Ntf::Message"

      before_action :set_ntf_message, only: %i[read]

      def index
        param! :limit, Integer, default: ::Ntf::MESSAGES_PER_PAGE
        param! :page, Integer, default: 1
        param! :filter, Hash, default: {} do |f|
          f.param! :category_id, Integer
        end
        param! :sort, String, in: %w[id], transform: :downcase, default: "id"
        param! :order, String, in: %w[asc desc], transform: :downcase, default: "desc"

        messages = ::Ntf::Message
          .user_messages(current_user.id)
          .search_category(params[:filter][:category_id])
          .order("#{params[:sort]} #{params[:order]}")
          .paginate(per_page: params[:limit], page: params[:page])

        read_messages = ::Ntf::Message.read_messages(current_user.id).pluck(:id)

        @meta = {total_pages: messages.total_pages, read_messages: read_messages}
        render json: ::Ntf::MessagesPresenter.new(messages: messages, meta: @meta)
      end

      def read
        checkout_messages(current_user.id, [@ntf_message])
        head :ok
      end

      def read_all
        checkout_messages(current_user.id, unread_messages)
        head :ok
      end

      private

      def set_ntf_message
        @ntf_message = ::Ntf::Message.find_by(
          "id = ? AND (spread->'users'= '[]'::jsonb OR spread->'users' @> '[?]'::jsonb)",
          params[:message_id], current_user.id
        )
        raise ExceptionHandler::NotFound, Message.not_found unless @ntf_message.present?
      end

      def unread_messages
        ::Ntf::Message.where(
          "(spread->'users'= '[]'::jsonb OR spread->'users' @> '[:current_user_id]'::jsonb) AND
           NOT(read->'users' @> '[:current_user_id]'::jsonb)",
          current_user_id: current_user.id
        )
      end
    end
  end
end
