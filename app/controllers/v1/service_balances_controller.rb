# frozen_string_literal: true

module V1
  # An ServiceBalances Controller
  class ServiceBalancesController < ApplicationController
    authorize_resource
    load_and_authorize_resource
    before_action :set_service_balance, only: %i[show update destroy]

    # GET /service_balances
    def index
      json_response paginate(ServiceBalance.all), :ok
    end

    # GET /service_balances/show_by_params?client_id=:client_id&service_id=:service_id
    def show_by_params
      param! :client_id, Integer
      param! :service_id, Integer

      return render json: {} if params[:service_id] <= 0 || params[:client_id] <= 0

      service_balance = ServiceBalance
                        .includes(service: :currency)
                        .find_or_create_by(
                          client_id: params[:client_id],
                          service_id: params[:service_id]
                        )
      render json: ServiceBalancePresenter.new(service_balance)
    end

    # GET /service_balances/1
    def show
      json_response(@service_balance, :ok)
    end

    # POST /service_balances
    def create
      ServiceBalance.create!(with_params)
      json_response '', :created
    end

    # PATCH/PUT /service_balances/1
    def update
      @service_balance.update!(with_params)
      json_response
    end

    # только пополнение баланса
    def sum_balance
      service_balance = ServiceBalance.find_or_create_by(params_only_create)
      ServiceBalances::PutMoney.call(service_balance: service_balance,
                                     balance: balance_params[:balance],
                                     #  client_id: params[:client_id],
                                     #  service_id: params[:service_id],
                                     current_user_id: current_user.id,
                                     ip: _request_ip,
                                     source: 1)
      json_response
    end

    # покупка часов фабрикой Tmsupport::TmSupportConvertor и Tmsupport::NewTmSupportConvertor
    # TmSupport - покупка для старых тарифов
    # NewTmSupport - покупка для новых тарифов,
    # Входящие параметры:
    # params[:id],  params[:minutes]
    def money_to_hours
      param! :minutes, Integer, required: true, min: 1
      param! :payments, String, required: true
      param! :kind, String, required: true, in: %w[TmSupport NewTmSupport]

      case params[:kind]
      when 'TmSupport'
        param! :minutes, Integer, required: true, min: 5, message: "Минимальное время покупки 5 часов"
      end

      mc = "::Tmsupport::#{params[:kind]}Convertor".constantize.new(
          client_id: params[:client_id],
          service_id: params[:service_id],
          current_user: current_user,
          price: params[:price],
          minutes: params[:minutes]
      )
      render json: PresentersServiceBalance::BalancePresenter.new(mc.money_to_hours)
    rescue StandardError => e
      Rails.logger.error e.message
      Rails.logger.error e.backtrace.join("\n")
      json_response(
        { message: 'Ошибка покупки часов Техподдержки: ' + e.message }, 422
      )
    end

    # DELETE /service_balances/1
    def destroy
      @service_balance.destroy
    end

    private

    def set_service_balance
      @service_balance = ServiceBalance.find(params[:id])
    end

    def set_sb_by_client_and_service
      @service_balance = ServiceBalance
                         .where('client_id=? and service_id=?',
                                params[:client_id],
                                params[:service_id])
                         .first
    end

    def with_params
      params.require(:service_balance).permit(
        :client_id,
        :service_id,
        :balance
      )
    end

    def params_only_create
      params.require(:service_balance).permit(
        :client_id,
        :service_id
      )
    end

    def balance_params
      params.require(:service_balance).permit(
        :balance
      )
    end

    def new_stp_params
      params.require(:new_stp_params).permit(:client_id, :service_id, :balance, :pay)
    end
  end
end
