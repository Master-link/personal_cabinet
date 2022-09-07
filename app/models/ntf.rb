# frozen_string_literal: true

# Уведомления
module Ntf
  MESSAGES_PER_PAGE = 20
  CATEGORIES_PER_PAGE = 20

  def self.table_name_prefix
    'ntf_'
  end
end
