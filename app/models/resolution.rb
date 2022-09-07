# == Schema Information
#
# Table name: resolutions
#
#  id         :bigint           not null, primary key
#  c_action   :string
#  c_class    :string
#  comment    :text
#  condition  :text
#  enabled    :boolean          default(TRUE)
#  json_data  :jsonb
#  name       :string
#  version    :string           default("V1")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Resolution < ApplicationRecord
  has_and_belongs_to_many :roles

  scope :enabled, -> { where(enabled: true) }
  scope :by_role, lambda { |role|
                    where("json_data->'roles'= '[]'::jsonb OR (json_data->'roles')::jsonb ? :role", role: role)
                  }
end
