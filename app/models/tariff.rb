# frozen_string_literal: true

# == Schema Information
#
# Table name: tariffs
#
#  id              :bigint           not null, primary key
#  advance_payment :decimal(15, 2)
#  deleted_at      :datetime
#  duration_kind   :string
#  ended_at        :datetime
#  extra           :json
#  kind            :string
#  name            :string
#  settings        :json
#  started_at      :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  service_id      :bigint
#
# Indexes
#
#  index_tariffs_on_deleted_at  (deleted_at)
#  index_tariffs_on_service_id  (service_id)
#
# Foreign Keys
#
#  fk_rails_...  (service_id => services.id)
#
class Tariff < ApplicationRecord
  include TariffConditions
  include FilterScope
  acts_as_paranoid

  belongs_to :service, counter_cache: true
  has_and_belongs_to_many :nomenclatures
  has_many :subscriptions
  has_many :documents
  has_many :opsms, as: :smsable # тариф для смс ресурса может иметь много опций
  accepts_nested_attributes_for :opsms

  scope :client_available_tariffs, lambda {
    where("ended_at >= ? or ended_at is null", DateTime.now)
  }

  scope :last_new_stp, lambda { |currency_id|
    where(
      "CAST(extra->>'new_tariff' as boolean) = ? and services.currency_id = ?",
      true, currency_id
    )
  }

  scope :tariffs_for_services, lambda { |service_ids|
    where("service_id IN (?)", service_ids)
  }

  scope :for_country, lambda { |currency_id|
    where(services: {currency_id: currency_id})
  }

  scope :extra_type_tariff, lambda { |stp_type|
    where("
    CAST(extra->>'#{stp_type}' AS boolean) = true
    ")
  }

  validates_presence_of :service, :name, :kind, :duration_kind

  validates_inclusion_of :kind, in: %w[kind_periodic kind_one_time]
  validates_inclusion_of :duration_kind, in: %w[
    duration_perpetual
    duration_once
    duration_month_start
    duration_month_date
    duration_day
    duration_year_date
    duration_quarter
    duration_custom_days
    duration_custom_months
  ]
  validates :advance_payment, allow_blank: true, numericality: {only_float: false}

  before_save :set_credit_limit_negative

  EXTRA_SINGULAR_TARIFF = "singular_tariff"
  EXTRA_URGENT_TARIFF = "urgent_tariff"
  EXTRA_NEW_TARIFF = "new_tariff"

  KIND_DURATION_PERPETUAL = "duration_perpetual"
  KIND_DURATION_ONCE = "duration_once"
  KIND_DURATION_MONTH_START = "duration_month_start"
  KIND_DURATION_MONTH_DATE = "duration_month_date"
  KIND_DURATION_DAY = "duration_day"
  KIND_DURATION_YEAR_DATE = "duration_year_date"
  KIND_DURATION_QUARTER = "duration_quarter"
  KIND_DURATION_CUSTOM_DAYS = "duration_custom_days"
  KIND_DURATION_CUSTOM_MONTHS = "duration_custom_months"
  KIND_PERIODIC = "kind_periodic"

  def changeable?
    extra["changeable"]
  end

  def document_subject
    extra["document_subject"]
  end

  def state
    if ended_at.present?
      ended_at <= DateTime.now
    else
      false
    end
  end

  def set_started_period(ended_at)
    return ended_at.end_of_month if duration_kind == Tariff::KIND_DURATION_MONTH_START
    return ended_at if duration_kind == Tariff::KIND_DURATION_DAY

    ended_at + 1.day
  end

  def add_period(ended_at)
    return ended_at + 1.year if duration_kind == Tariff::KIND_DURATION_YEAR_DATE
    return ended_at + 1.month if duration_kind == Tariff::KIND_DURATION_MONTH_DATE
    return ended_at.next_month.end_of_month - 1.day if duration_kind == Tariff::KIND_DURATION_MONTH_START
    return ended_at + 3.month if duration_kind == Tariff::KIND_DURATION_QUARTER
    return ended_at + extra["custom_period"].to_i.month if duration_kind == Tariff::KIND_DURATION_CUSTOM_MONTHS
    return ended_at + extra["custom_period"].to_i.day if duration_kind == Tariff::KIND_DURATION_CUSTOM_DAYS
    return ended_at + 1.day if duration_kind == Tariff::KIND_DURATION_DAY

    false
  end

  # если нет номенклатуры, берем тариф по смс сервису
  def self.detect_tariff(nomenclature_code)
    return Tariff.joins(:service).where("ticket->>'kind'='#{Service::KIND_SMS_GATE}'").first if nomenclature_code.nil?

    Tariff.includes(:nomenclatures).where(nomenclatures: {code: nomenclature_code}).first
  end

  def periodic?
    kind == KIND_PERIODIC
  end

  def service_ticket_tariff_class
    service.ticket["tariff"].camelize
  end

  def build_subscription
    "::Subscriptions::#{service_ticket_tariff_class}::Subscription".constantize
  end

  def jsonapi_serializer_class_name
    Old::TariffSerializer
  end

  private

  def set_credit_limit_negative
    credit_limit = extra["credit_limit"].to_i
    extra["credit_limit"] = -credit_limit if credit_limit.positive?
  end
end
