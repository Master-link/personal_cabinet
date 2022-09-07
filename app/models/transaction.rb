# frozen_string_literal: true

# == Schema Information
#
# Table name: transactions
#
#  id              :bigint           not null, primary key
#  detail          :json
#  money           :decimal(15, 2)   not null
#  source          :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  client_id       :bigint
#  one_c_id        :string
#  service_id      :bigint
#  subscription_id :bigint
#  user_id         :bigint
#
# Indexes
#
#  index_transactions_on_client_id        (client_id)
#  index_transactions_on_service_id       (service_id)
#  index_transactions_on_subscription_id  (subscription_id)
#  index_transactions_on_user_id          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (service_id => services.id)
#  fk_rails_...  (subscription_id => subscriptions.id)
#  fk_rails_...  (user_id => users.id)
#
class Transaction < ApplicationRecord
  include FilterScope
  before_create :define_source

  def define_source
    self.source ||= 1
  end

  has_many :documents, foreign_key: "transaction_id"
  belongs_to :client
  belongs_to :subscription, optional: true
  belongs_to :service
  belongs_to :user, optional: true

  # можно удалить после тестирования
  SOURCE_1C = :source_1c
  SOURCE_API = :source_api
  SOURCE_SMS = :source_sms
  SOURCE_PAYMASTER = :source_paymaster
  SOURCE_PAYKEEPER = :paykeeper
  SOURCE_ADVANCE_PAYMENT = :source_advance_payment
  SOURCE_CALLS_BOT = :source_calls_bot

  enum source: %i[
    source_1c
    source_api
    source_sms
    source_paymaster
    paykeeper
    source_advance_payment
    source_calls_bot
  ]

  scope :by_clients, ->(id) { where(client_id: id) }
  scope :namesort, ->(column = :name, val = :asc) { order(column => val) }
  belongs_to :client, -> { order(name: :desc) }

  validates_numericality_of :money
end
