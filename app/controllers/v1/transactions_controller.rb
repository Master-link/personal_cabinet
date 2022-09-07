# frozen_string_literal: true

module V1
  class TransactionsController < ApplicationController
    authorize_resource
    before_action :set_transaction, only: %i[show update destroy]

    def new_transaction
      @transaction = Transaction.new(params)
    end

    def by_clients
      param! :sort, String, in: %w[id name], transform: :downcase, default: "id"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
      param! :page, Integer, default: 1

      @transactions = Transaction
        .includes(:clients, :subscription, :users, :services)
        .paginate(
          per_page: 15,
          page: params[:page]
        )
        .namesort(
          params[:sort],
          params[:order]
        )
      options = {}
      options[:include] = %i[client subscription service user]
      options[:meta] = {total_pages: @transactions.total_pages, current_page: params[:page]}
      json_response TransactionSerializer.new(
        @transactions,
        options
      ).serialized_json, :ok
    end

    def summ
      param! :filter, Hash, default: [] do |f|
        f.param! :client_id, Array do |s, i|
          s.param! i, Integer, message: "ошибка параметра фильтра client_id"
        end
        f.param! :service_id, Array do |s, i|
          s.param! i, Integer, message: "ошибка параметра фильтра service_id"
        end
        f.param! :source, Array do |s, i|
          s.param! i, Integer, message: "ошибка параметра фильтра источника"
        end
      end

      transactions = Transaction
        .includes(:client, :service)
        .do_filter(get_params[:filter])
        .sum(:money).to_i

      render json: transactions, adapter: :json
    end

    def index
      param! :sort, String, in: %w[services.name name clients.name updated_at money source crms.crm],
        transform: :downcase, default: "id"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
      param! :page, Integer, default: 1
      param! :limit, Integer, default: 50
      param! :filter, Hash, default: {} do |f|
        f.param! :service_id, Array do |s, i|
          s.param! i, Integer, message: "ошибка параметра фильтра service_id"
        end
        f.param! :source, Array do |s, i|
          s.param! i, Integer, message: "ошибка параметра фильтра источника"
        end
      end
      param! :transaction_filter, Hash, default: {} do |f|
        f.param! :clients, String, message: "ошибка параметра фильтра client_id"
        f.param! :period, Hash, default: {} do |s, _i|
          if params[:transaction_filter][:period][:gte].present?
            s.param! :gte, Date, message: "не корректная дата"
          end
          if params[:transaction_filter][:period][:lte].present?
            s.param! :lte, Date, message: "не корректная дата"
          end
        end
      end

      @transactions = Transaction
        .includes({client: :crm}, :service)
        .do_filter(get_params[:filter])
        .array_of_jsons_or_integers_filter(get_params[:transaction_filter][:client_id])
        .filter_gte("transactions", get_params[:transaction_filter][:period][:gte])
        .filter_lte("transactions", get_params[:transaction_filter][:period][:lte])
        .order("#{params[:sort]} #{params[:order]}")
        .paginate(per_page: params[:limit], page: params[:page])

      @meta = {
        total_pages: @transactions.total_pages
      }
      if get_params.dig(:filter, :service_id).present?
        @meta = @meta.merge(
          service: ServicePresenter.new(
            Service.find_by(id: get_params[:filter][:service_id])
          )
        )
      end
      if get_params.dig(:filter, :client_id).present?
        @meta = @meta.merge(
          client: ClientPresenter.new(
            Client.find_by(id: get_params[:filter][:client_id])
          )
        )
      end

      render json: TransactionsIndexPresenter.new(data: @transactions, meta: @meta)
    end

    def show
      json_response(@transaction, :ok)
    end

    def create
      param! :source, Integer, default: 1
      param! :client_id, Integer
      param! :service_id, Integer
      param! :money, Float
      param! :detail, Hash, default: {comment: ""} do |f|
        f.param! :comment, String
      end

      service_balance = ServiceBalance.find_or_create_by(
        service_id: params[:service_id], client_id: params[:client_id]
      )

      ServiceBalances::PutMoney.call(
        service_balance: service_balance,
        balance: params[:money],
        current_user_id: current_user.id,
        ip: _request_ip,
        comment: params[:detail][:comment],
        source: params[:source]
      )

      json_response "", :created
    end

    def update
      @transaction.update!(with_params)
      json_response
    end

    def destroy
      @transaction.destroy
    end

    private

    def set_transaction
      @transaction = Transaction.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      raise ActiveRecord::RecordNotFound
    end

    def with_params
      params.require(:transaction).permit(
        :client_id,
        :subscription_id,
        :service_id,
        :user_id,
        :one_c_id,
        :money,
        :source,
        detail: {}
      )
    end

    def get_params
      params.permit(
        :page,
        :sort, :order,
        filter: [
          service_id: [], source: []
        ],
        transaction_filter: [
          :client_id,
          period: %i[
            gte lte
          ]
        ]
      )
    end
  end
end
