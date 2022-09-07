# frozen_string_literal: true

# == Schema Information
#
# Table name: newaccounts
#
#  id               :bigint           not null, primary key
#  client_comment   :text
#  crm              :string
#  final_spend_time :integer
#  name             :text
#  spend_time       :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  appeal_id        :integer
#
class NewaccountFilter < Newaccount
  # скопы фильтраций
  scope :search_client, lambda { |search|
    where('crm like ?', search) if search.present?
  }
end
