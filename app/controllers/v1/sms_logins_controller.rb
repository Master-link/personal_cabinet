# frozen_string_literal: true

module V1
  # A SmsLogin module
  class SmsLoginsController < ApplicationController
    def search
      json_response({data: [
        {
          type: "sms_route",
          id: 1,
          attributes: {
            login: "acc_2",
            address: "192.168.0.1",
            client_id: 9,
            enabled: true,
            account_id: nil,
            settings: {
              source_addr_autodetect: false,
              forced_encode: nil,
              source_addr_ton: 0,
              source_addr_npi: 1,
              dest_addr_ton: 1,
              dest_addr_npi: 1
            },
            negative_balance: false,
            sms_per_minute_limit: 100,
            addresses: []
          }
        },
        {
          type: "sms_route",
          id: 2,
          attributes: {
            login: "acc_2",
            address: "192.168.0.2",
            client_id: 9,
            enabled: true,
            account_id: nil,
            settings: {
              source_addr_autodetect: false,
              forced_encode: nil,
              source_addr_ton: 0,
              source_addr_npi: 1,
              dest_addr_ton: 1,
              dest_addr_npi: 1
            },
            negative_balance: false,
            sms_per_minute_limit: 100,
            addresses: []
          }
        }
      ]}, :ok)
    end

    def search_free
      render json: {data: [
        {
          type: "sms_route",
          id: 1,
          attributes: {
            login: "acc_1",
            address: "192.168.0.1",
            client_id: 9,
            enabled: true,
            account_id: nil,
            settings: {
              source_addr_autodetect: false,
              forced_encode: nil,
              source_addr_ton: 0,
              source_addr_npi: 1,
              dest_addr_ton: 1,
              dest_addr_npi: 1
            },
            negative_balance: false,
            sms_per_minute_limit: 100,
            addresses: []
          }
        },
        {
          type: "sms_route",
          id: 2,
          attributes: {
            login: "acc_2",
            address: "192.168.0.2",
            client_id: 9,
            enabled: true,
            account_id: nil,
            settings: {
              source_addr_autodetect: false,
              forced_encode: nil,
              source_addr_ton: 0,
              source_addr_npi: 1,
              dest_addr_ton: 1,
              dest_addr_npi: 1
            },
            negative_balance: false,
            sms_per_minute_limit: 100,
            addresses: []
          }
        }
      ]}, status: :ok
    end
  end
end
