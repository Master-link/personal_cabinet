# frozen_string_literal: true

module V1
  class CurrenciesController < ApplicationController
    authorize_resource
    before_action :set_currency, only: %i[show update destroy]

    def index
      @currencies = Currency.all

      json_response paginate(@currencies)
    end

    def search
      @currencies = Currency.where("currencies.name ilike ?", "%#{params[:name]}%")
        .paginate(per_page: 4, page: params[:page])
      @meta = {total_pages: @currencies.total_pages}
      render json: CurrencySearchPresenter.new(currencies: @currencies, meta: @meta)
    end

    def show
      json_response @currency
    end

    def create
      Currency.create!(with_params)
      json_response "", :created
    end

    def update
      @currency.update!(with_params)
      json_response
    end

    def destroy
      @currency.destroy
    end

    private

    def set_currency
      @currency = Currency.find(params[:id])
    end

    def with_params
      params.require(:currency).permit(:name, :symbol, :iso4217_code, :iso4217_num)
    end
  end
end
