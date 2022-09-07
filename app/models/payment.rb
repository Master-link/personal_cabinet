# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id              :bigint           not null, primary key
#  amount          :decimal(15, 2)
#  jsondata        :jsonb
#  kind            :string
#  link_on_fail    :string
#  link_on_success :string
#  payment_type    :string
#  status          :enum
#  to_do           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  client_id       :bigint
#  provider_id     :string
#  service_id      :bigint
#
# Indexes
#
#  index_payments_on_client_id   (client_id)
#  index_payments_on_service_id  (service_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (service_id => services.id)
#
class Payment < ApplicationRecord
  include AASM
  belongs_to :client
  belongs_to :service

  validates :kind, inclusion: { in: ['card_buy_tm_hours'] }, allow_nil: true

  STATUS_CREATED         = 'create'
  STATUS_WAITING_CONFIRM = 'waited_confirm'
  STATUS_SUCCESS         = 'success'

  aasm column: 'status' do
    state :create, initial: true
    state :success
    state :wait_confirm

    event :waited_confirm do
      transitions from: [:create], to: :wait_confirm
    end

    event :successed do
      transitions from: [:wait_confirm], to: :success
    end
  end
end
