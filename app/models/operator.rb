# == Schema Information
#
# Table name: operators
#
#  id         :bigint           not null, primary key
#  kind       :integer          default(1), not null
#  name       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Operator < ApplicationRecord
  include FilterScope
  validates_presence_of :name, :title
end
