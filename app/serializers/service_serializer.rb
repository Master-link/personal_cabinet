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
# serializer
class ServiceSerializer < ActiveModel::Serializer
  # set_type :currency
  attributes :id,
             :name,
             :state,
             :alert_template_email,
             :alert_template_sms,
             :notify_expires_days,
             :ticket,
             :tariffs_count,
             :agreement
  has_one :currency
  has_one :legal_entity
  has_many :countries
end
