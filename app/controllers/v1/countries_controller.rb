# frozen_string_literal: true

module V1
  # An Countries Controller
  class CountriesController < ApplicationController
    skip_before_action :authorize_request
    before_action :set_country, only: %i[show update destroy]
    swagger_controller :countries, "Countries Management"

    swagger_api :index do
      summary "Список стран"
      notes "Список стран"
      param :query, "sort", :string, :optional, "Поле сортировки (id, name)"
      param :query, "order", :string, :optional, "Направление сортировки (asc, desc)"
      param :query, "page", :string, :optional, "Страница (по умолчанию 1)"
      param :query, "limit", :string, :optional, "Лимит записей на странице (по умолчанию 500)"
      response :success
      response :unprocessable_entity
    end
    def index
      param! :sort, String, in: %w[id name], transform: :downcase, default: "name"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
      param! :page, Integer, default: 1
      param! :limit, Integer, max: 300, default: 300

      render json: CountrySearchPresenter.new(
        countries: Country
          .order("#{params[:sort]} #{params[:order]}")
          .paginate(
            per_page: params[:limit],
            page: params[:page]
          ),
        meta: {total_pages: 1}
      )
    end

    swagger_api :create do
      summary "Создание страны"
      notes "Implementation countries"
      param :form, "name", :string, :required, "Название страны"
      param :form, "phone_code", :string, :required, "Код телефона"
      response :success
      response :unprocessable_entity
    end
    def create
      Country.create!(with_params)
      json_response "", :created
    end

    def show
      json_response(@country, :ok)
    end

    def update
      @country.update!(with_params)
      json_response
    end

    def destroy
      # if REALLY destro - country.really_destroy!
      @country.destroy
      json_response
    end

    private

    def with_params
      params.permit(
        :name,
        :phone_code
      )
    end

    def set_country
      @country = Country.find(params[:id])
    end
  end
end
