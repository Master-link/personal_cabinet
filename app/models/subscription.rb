# frozen_string_literal: true

# == Schema Information
#
# Table name: subscriptions
#
#  id           :bigint           not null, primary key
#  credit_limit :integer
#  ended_at     :datetime
#  jsondata     :json
#  settings     :json
#  started_at   :datetime
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  client_id    :bigint
#  tariff_id    :bigint
#
# Indexes
#
#  index_subscriptions_on_client_id  (client_id)
#  index_subscriptions_on_tariff_id  (tariff_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (tariff_id => tariffs.id)
#
# базовая модель для всех
class Subscription < ApplicationRecord
  include Dry::Monads[:result, :do]

  include FilterScope
  include AASM

  validates :started_at, presence: true
  validates :ended_at, presence: true, if: :tariff_periodic?
  validate :ended_at_check, if: :tariff_periodic?

  belongs_to :client
  belongs_to :tariff
  has_many :documents
  has_many :transactions
  has_one :service_balance, lambda { |subscription|
    unscope(where: :subscription_id)
      .where(
        client_id: subscription.client_id,
        service: subscription.tariff.service
      )
  }
  has_one :service, through: :tariff

  before_save :turn_credit_limit_negative

  STATE_NEW = :state_new
  STATE_ACTIVE = :state_active
  STATE_LIMITED = :state_limited
  STATE_SUSPEND = :state_suspend
  STATE_CLOSED = :state_closed
  STATE_RENEWAL = :state_renewal
  STATE_CONTINUE = :state_continue
  STATE_OUTDATED = :state_outdated

  scope :actives, -> { where(state: Subscription::STATE_ACTIVE) }
  scope :not_closed, -> { where.not(state: Subscription::STATE_CLOSED) }
  scope :expired, -> { where("ended_at < ? and state = ?", Time.zone.now, Subscription::STATE_ACTIVE) }
  scope :for_renewed, lambda {
    includes(:tariff)
      .where(state: Subscription::STATE_RENEWAL)
      .where.not(tariff: Tariff.where(service_id: Service.callsbot_ids))
      .where.not(tariff: Tariff.where(service_id: Service.sms_ids))
  }

  scope :actives_by_service_and_client, lambda { |client_id, service_id|
    includes(:service)
      .where(services: {id: service_id})
      .where(client_id: client_id)
      .where(state: Subscription::STATE_ACTIVE)
  }

  scope :subscribe_expired_in_n_days, lambda { |in_days|
    joins(:tariff).where("tariffs.kind like ? and date(subscriptions.ended_at) = ? and subscriptions.state like ?",
      "kind_periodic",
      DateTime.now + in_days.days,
      Subscription::STATE_ACTIVE)
  }
  scope :active_on_date, lambda { |date|
    where(state: activated_states)
      .where("subscriptions.started_at <= ?", date)
      .where("subscriptions.ended_at >= ? OR subscriptions.ended_at IS NULL", date)
  }
  # подписки за дату
  scope :on_date, lambda { |date|
    where("started_at <= ?", date).where("ended_at >= ? OR subscriptions.ended_at IS NULL", date)
  }

  scope :filter_tariff, ->(ids) { where(tariff_id: ids) if ids.present? }
  scope :filter_state, ->(states) { where(state: states) if states.present? }

  def self.activated_states
    [
      Subscription::STATE_ACTIVE,
      Subscription::STATE_LIMITED,
      Subscription::STATE_SUSPEND,
      Subscription::STATE_CLOSED
    ]
  end

  def self.all_statuses
    [
      Subscription::STATE_NEW,
      Subscription::STATE_ACTIVE,
      Subscription::STATE_LIMITED,
      Subscription::STATE_SUSPEND,
      Subscription::STATE_CLOSED,
      Subscription::STATE_RENEWAL
    ]
  end

  def common_payment_value
    if subscription_price? && tariff.changeable?
      jsondata["subscribe_price"].to_f
    else
      tariff.advance_payment.to_f
    end
  end

  def is_renewed?
    state.to_sym == STATE_RENEWAL
  end

  def subscription_price?
    jsondata["subscribe_price"].present?
  end

  def kredit_limit
    credit_limit.to_f || tariff.extra["credit_limit"].to_f
  end

  def kredit_limit_no_overflowed?
    kredit_limit < service_balance.balance
  end

  def enough_money_for_activating?
    (service_balance.balance - credit_limit.to_i).to_i >= common_payment_value
  end

  def shift_suspend!
    case aasm_read_state
    when Subscription::STATE_ACTIVE
      suspended!
    when Subscription::STATE_SUSPEND
      activated! if zero_subscriptions?
    end
  end

  def shift_autocontinue!
    case aasm_read_state
    when Subscription::STATE_CONTINUE
      newed!
    when Subscription::STATE_NEW
      continued!
    end
  end

  def service_ticket_tariff_class
    return unless service.ticket["tariff"]

    service.ticket["tariff"].camelize
  end

  def on_activate
    if zero_subscriptions?
      activated! if may_activated?
      Success()
    else
      Failure({
        result: "В этой услуге не может быть больше 1 актиной подписки",
        subscription: id,
        crm: client.crm.crm,
        state_now: state
      })
    end
  end

  def on_deactivate
    limited! if may_limited?
    Success()
  end

  def tariff_periodic?
    tariff&.periodic?
  end

  def started_at_check
    return unless is_correct_date?(started_at)

    errors.add(:started_at, "Начало подписки не может быть меньше текущего времени") if started_at < Time.zone.now
  end

  def ended_at_check
    return unless is_correct_date?(started_at) && is_correct_date?(ended_at)

    errors.add(:ended_at, "Начало подписки не может быть позже чем окончание подписки") if started_at > ended_at
  end

  def zero_subscriptions?
    Subscription.joins(:service).where(
      services: tariff.service,
      client_id: client_id,
      state: Subscription::STATE_ACTIVE
    ).count.zero?
  end

  def jsonapi_serializer_class_name
    Old::SubscriptionSerializer
  end

  def self.client_one_subscription_by_service(service_id, client_id)
    Subscription.includes(tariff: :service)
      .find_by(
        client_id: client_id,
        tariffs: {service_id: service_id},
        state: Subscription::STATE_ACTIVE
      )
  end

  private

  def turn_credit_limit_negative
    self.credit_limit = -credit_limit if credit_limit.present? && credit_limit.positive?
  end

  def is_correct_date?(date)
    Date.parse(date.to_s)
  rescue ArgumentError
    false
  end
end
