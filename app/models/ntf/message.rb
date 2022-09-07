# frozen_string_literal: true

# == Schema Information
#
# Table name: ntf_messages
#
#  id          :bigint           not null, primary key
#  link        :string
#  message     :string
#  read        :jsonb
#  spread      :jsonb
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint
#
# Indexes
#
#  index_ntf_messages_on_category_id  (category_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => ntf_categories.id)
#
module Ntf
  class Message < ApplicationRecord
    belongs_to :category, class_name: 'Ntf::Category'

    validates_presence_of :message
    validates_length_of :message, maximum: 255

    scope :user_messages, lambda { |current_user_id|
      where(
        "spread->'users'= '[]'::jsonb OR spread->'users' @> '[?]'::jsonb",
        current_user_id
      )
    }

    scope :read_messages, lambda { |current_user_id|
      where("read->'users' @> '[?]'::jsonb", current_user_id)
    }

    scope :not_read_messages, lambda { |current_user_id|
      where.not("read->'users' @> '[?]'::jsonb", current_user_id)
    }

    scope :search_category, lambda { |category_id|
      where(category_id: category_id) if category_id.present? && category_id != 'null'
    }
  end
end
