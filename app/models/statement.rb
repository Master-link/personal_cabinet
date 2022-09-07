# frozen_string_literal: true

# a Statement model (Report уже предопределен как модуль)
class Statement < ApplicationRecord
  def self.columns
    @columns ||= []
  end
end
