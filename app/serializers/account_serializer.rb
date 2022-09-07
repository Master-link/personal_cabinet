# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id              :bigint           not null, primary key
#  name            :string
#  spend_time      :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  subscription_id :bigint
#
# Indexes
#
#  index_accounts_on_subscription_id  (subscription_id)
#
# Foreign Keys
#
#  fk_rails_...  (subscription_id => subscriptions.id)
#
# serializer
class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name, :spend_time
  has_one :subscription
end
