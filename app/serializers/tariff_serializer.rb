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
# serializer
class TariffSerializer < ActiveModel::Serializer
  attributes :id, :name, :started_at, :ended_at, :kind, :duration_kind, :advance_payment, :settings, :extra
  has_one :service
  has_many :nomenclatures
  has_many :opsms, :as => :smsable
end
