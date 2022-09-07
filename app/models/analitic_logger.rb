# == Schema Information
#
# Table name: analitic_loggers
#
#  id         :bigint           not null, primary key
#  log        :jsonb
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class AnaliticLogger < ApplicationRecord
  include TaxophoneFilterScope
end
