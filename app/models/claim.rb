# == Schema Information
#
# Table name: claims
#
#  id              :bigint           not null, primary key
#  comment         :text
#  date_activation :datetime
#  state           :text             default("state_new")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  client_id       :bigint
#  service_id      :bigint
#  tariff_id       :bigint
#
# Indexes
#
#  index_claims_on_client_id   (client_id)
#  index_claims_on_service_id  (service_id)
#  index_claims_on_tariff_id   (tariff_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (service_id => services.id)
#  fk_rails_...  (tariff_id => tariffs.id)
#
class Claim < ApplicationRecord
  include AASM
  include FilterScope

  belongs_to :client
  belongs_to :service
  belongs_to :tariff

  STATE_NEW        = :state_new
  STATE_APPROVED   = :state_approved
  STATE_REFUSED    = :state_refused

  ALL_STATES = [self::STATE_NEW, self::STATE_APPROVED, self::STATE_REFUSED].map(&:to_s).freeze

  validates_length_of :comment, maximum: 10_000, allow_blank: true
  validate :date_activation, if: :validate_datetime?
  validates :state, inclusion: { in: [STATE_NEW, STATE_APPROVED, STATE_REFUSED].map(&:to_s) }

  aasm column: 'state' do
    state STATE_NEW, initial: true
    state STATE_APPROVED
    state STATE_REFUSED

    event :approved do
      transitions from: [STATE_NEW], to: STATE_APPROVED
    end

    event :refused do
      transitions from: [STATE_NEW], to: STATE_REFUSED
    end
  end

  private

  def validate_datetime?
    errors.add(:date_activation, 'must be a valid datetime') unless date_activation.present?
  end
end
