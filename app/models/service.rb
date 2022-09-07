# frozen_string_literal: true

# == Schema Information
#
# Table name: services
#
#  id                   :bigint           not null, primary key
#  agreement            :text
#  alert_template_email :string
#  alert_template_sms   :string
#  name                 :string
#  notify_expires_days  :integer
#  state                :string
#  tariffs_count        :integer          default(0)
#  ticket               :json
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  currency_id          :bigint
#  legal_entity_id      :bigint
#
# Indexes
#
#  index_services_on_currency_id      (currency_id)
#  index_services_on_legal_entity_id  (legal_entity_id)
#
# Foreign Keys
#
#  fk_rails_...  (currency_id => currencies.id)
#  fk_rails_...  (legal_entity_id => legal_entities.id)
#
class Service < ApplicationRecord
  include FilterScope
  include Filterable

  belongs_to :currency
  belongs_to :legal_entity
  has_many :tariffs, counter_cache: true
  has_many :subscriptions, through: :tariffs
  has_many :service_balances
  has_many :geographies
  has_many :countries, through: :geographies

  accepts_nested_attributes_for :countries

  validates_length_of :name, minimum: 2, maximum: 255
  validates_presence_of :currency, :name, :state

  before_save :setup_tariff

  # подключаемые услуги: если клиент совпадает по стране и разрешено подписываться
  scope :client_services_for_cities, lambda { |client|
    joins(:countries)
      .where(
        countries: {
          id: client.country_id
        },
        state: 'active'
      )
  }

  scope :client_sms, lambda { |client|
    joins(:countries)
      .where(
        countries: {
          id: client.country_id
        },
        state: 'active'
      )
      .where("ticket->>'kind'='#{Service::KIND_SMS_GATE}'")
      .where("services.ticket->>'allow_subscribe'='true'")
  }

  scope :actual_for_client, lambda { |client|
    joins(:tariffs, :countries)
      .where(
        countries: {
          id: client.country_id
        }
      )
      .where(
        'tariffs.started_at < :ended and (tariffs.ended_at IS NULL OR tariffs.ended_at > :ended)',
        ended: Time.zone.now
      ).uniq
  }

  scope :sms_ids, lambda {
    where("ticket->>'kind'='#{Service::KIND_SMS_GATE}'").pluck(:id)
  }

  scope :callsbot_ids, lambda {
    where("ticket->>'kind'='#{Service::KIND_CALLS_BOT}'").pluck(:id)
  }

  scope :taxophone_ids, lambda {
    where("ticket->>'kind'='#{Service::KIND_TAXOPHONE}'").pluck(:id)
  }

  scope :payment_gate_ids, lambda {
    where("ticket->>'kind'='#{Service::PAYMENT_GATE}'").pluck(:id)
  }

  # услуги техподдержки и ТМДрайва
  scope :tp_ids, lambda {
    where("ticket->>'kind'='#{Service::KIND_TECH_SUPPORT}'").pluck(:id)
  }

  # услуги только техподдержки
  scope :stp_ids, lambda {
    where("
      ticket->>'tariff'='#{Service::TARIFF_STP}' OR
      ticket->>'tariff'='#{Service::TARIFF_STP_KZ}'
    ").pluck(:id)
  }

  scope :custom_ids, lambda {
    where("ticket->>'kind'='#{Service::KIND_CUSTOM}'").pluck(:id)
  }

  TICKET_JSON_SCHEMA = Rails.root.join(
    'config',
    'schemas',
    'services',
    'ticket.json_schema'
  ).to_s

  KIND_SMS_GATE     = 'sms_gate'
  KIND_TECH_SUPPORT = 'tech_support'
  KIND_CUSTOM       = 'custom'
  KIND_TAXOPHONE    = 'taxophone'
  KIND_LICENSE      = 'license'
  KIND_CALLS_BOT    = 'calls_bot'
  PAYMENT_GATE = 'payment_gate'
  KINDS_STANDARD = 'standard'

  TARIFF_STP_KZ = 'tehsupport_kz'
  TARIFF_STP = 'tehsupport'

  def is_sms_service?
    %w[sms sms_kz].include?(ticket['tariff'])
  end

  def is_calls_bot_service?
    %w[voice_robot voice_robot_kz].include?(ticket['tariff'])
  end

  def service_ticket_tariff_class
    ticket['tariff'].camelize
  end

  def jsonapi_serializer_class_name
    Old::ServiceSerializer
  end

  private

  def setup_tariff
    ticket['tariff'] = KINDS_STANDARD if ticket['tariff'].nil?
  end
end
