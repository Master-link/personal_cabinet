# frozen_string_literal: true

# a AccessToken model
class AccessToken < ApplicationRecord
  def self.columns
    @columns ||= []
  end
end
