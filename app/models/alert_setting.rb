# frozen_string_literal: true

# == Schema Information
#
# Table name: alert_settings
#
#  id            :bigint           not null, primary key
#  alert_type    :string
#  email_enabled :boolean          default(FALSE)
#  first_send_at :datetime
#  last_send_at  :datetime
#  name          :string
#  setting       :jsonb
#  sms_enabled   :boolean          default(FALSE)
#  state         :string           default("disabled")
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  client_id     :bigint
#
# Indexes
#
#  index_alert_settings_on_client_id                 (client_id)
#  index_alert_settings_on_client_id_and_alert_type  (client_id,alert_type) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#
class AlertSetting < ApplicationRecord
  include FilterScope

  belongs_to :client

  # типы уведомлений:
  # техподдержка - уведомление о дате окончания подписки
  TECH_SUPPORT_PERIODIC = 'tech_support_periodic'
  # техподдержка - мониторинг
  TECH_SUPPORT_MONITORING = 'tech_support_monitoring'
  # мониторинг доступности ТМС
  TMS_MONITORING = 'tms_monitoring'
  # техподдержка - бэкап
  TECH_SUPPORT_BACKUP = 'tech_support_backup'
  # лицензия - уведомление о дате окончания подписки
  LICENSE = 'license'
  # таксофон - уведомление о дате окончания подписки
  TAXOPHONE = 'taxophone'
  # обычная подписка с уведомлением о дате окончания подписки
  CUSTOM = 'custom'
  # смс подписка - уведомление о снижении баланса
  SMS_GATE = 'sms_gate'
  # кооллбот - уведомление о снижении баланса
  CALLS_BOT = 'calls_bot'

  TYPE_BALANCE_JSON_SCHEMA = Rails.root.join('config',
                                             'schemas',
                                             'alert_settings',
                                             'type_balance.json_schema').to_s
  TYPE_MONITORING_JSON_SCHEMA = Rails.root.join(
    'config',
    'schemas',
    'alert_settings',
    'type_monitoring.json_schema'
  ).to_s
  TYPE_PERIODIC_JSON_SCHEMA = Rails.root.join('config',
                                              'schemas',
                                              'alert_settings',
                                              'type_periodic.json_schema').to_s

  validates :client, presence: true
  validates :alert_type, presence: true, inclusion: %w[balance_trigger_sms
                                                       balance_trigger_voice_robot
                                                       comes_expire_trigger
                                                       monitoring_backup
                                                       monitoring_smpp
                                                       monitoring_tms]
  validates :state, presence: true, inclusion: %w[enabled disabled]
  validates :name, presence: true, inclusion: %w[trigger.sms
                                                 trigger.voice_robot
                                                 trigger.comes_expire_trigger
                                                 trigger.monitoring_backup
                                                 trigger.monitoring_smpp
                                                 trigger.monitoring_tms]
  validates :alert_type, uniqueness: { scope: :client_id, case_sensitive: false }
end
