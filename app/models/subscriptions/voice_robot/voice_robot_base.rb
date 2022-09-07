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
# SMS
class ::Subscriptions::VoiceRobot::VoiceRobotBase < ::Subscriptions::Sms::SmsBase
  private

  def callsbot_stat
    []
  end

  def call_on_activate
    Success()
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    Failure()
  end

  def call_on_deactivate
    Success()
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    Failure()
  end
end
