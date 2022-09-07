# frozen_string_literal: true

module V1
  class SmppAccountsController < ApplicationController
    def index
      render json: {
        data: [
          {
            id: 1,
            name: "Аккаунт 1"
          },
          {
            id: 2,
            name: "Аккаунт 2"
          },
          {
            id: 3,
            name: "Аккаунт 3"
          },
          {
            id: 4,
            name: "Аккаунт 4"
          },
          {
            id: 5,
            name: "Аккаунт 5"
          },
          {
            id: 6,
            name: "Аккаунт 6"
          },
          {
            id: 7,
            name: "Аккаунт 7"
          },
          {
            id: 8,
            name: "Аккаунт 8"
          },
          {
            id: 9,
            name: "Аккаунт 9"
          },
          {
            id: 10,
            name: "Аккаунт 10"
          }
        ],
        meta: {
          total_pages: 1
        }
      }
    end
  end
end
