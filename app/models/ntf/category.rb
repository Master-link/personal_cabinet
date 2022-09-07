# frozen_string_literal: true

# == Schema Information
#
# Table name: ntf_categories
#
#  id         :bigint           not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module Ntf
  class Category < ApplicationRecord
    has_many :messages, class_name: 'Ntf::Message'

    validates_presence_of :title
    validates_length_of :title, maximum: 255
  end
end
