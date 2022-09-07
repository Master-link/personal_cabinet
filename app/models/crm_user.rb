# frozen_string_literal: true

# a CrmUser model
class CrmUser < ApplicationRecord
  belongs_to :crm
  belongs_to :user
end
