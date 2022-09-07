# frozen_string_literal: true

# a Balance channel
class BalanceChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "BalanceChannel:#{params["room"]}"
    reject unless params["room"].present?
  end

  def subscribe_to_channel
    super
    if (current_user.roles.pluck("name") & %w[admin manager observer]).present?
      client = Client.find params["room"]
    elsif current_user.crms.present?
      client = Client.find_by(crm: current_user.crms.first)
    end

    service_balances = []
    service_balances = client.service_balances if client.present?
    ActionCable.server.broadcast("BalanceChannel:#{params["room"]}",
      ServiceBalancesPresenter.new(service_balances))
  end

  def unsubscribed
    stop_all_streams
  end
end
