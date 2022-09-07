# frozen_string_literal: true

# == Schema Information
#
# Table name: queuelogs
#
#  id          :bigint           not null, primary key
#  finished_at :datetime
#  name        :string
#  result      :jsonb
#  started_at  :datetime
#  state       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint
#
# Indexes
#
#  index_queuelogs_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Queuelog < ApplicationRecord
  include AASM
  belongs_to :user

  validates :user, presence: true
  validates_length_of :name, minimum: 1, maximum: 255, allow_blank: false

  aasm column: 'state' do
    state :delaying, initial: true
    state :running, :failing, :finishing, :canceled

    event :run do
      transitions from: :delaying, to: :running
    end

    event :fail do
      transitions from: :running, to: :failing
    end

    event :finish do
      transitions from: :running, to: :finishing
    end

    event :cancel do
      transitions from: :delaying, to: :canceled
    end
  end
end
