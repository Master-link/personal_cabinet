# frozen_string_literal: true

module V1
  # An Subscriptions Controller
  class SubscriptionsController < ApplicationController
    include Permit::Subscriptions::Params

    before_action :new_subscribe, only: [:create]
    authorize_resource
    load_and_authorize_resource except: %i[tmsupport client_subscribes_paysystems_names closed_and_renewed_details]
    before_action :set_subscription, only: %i[show update activate destroy admin_add_hours suspend close auto_continue]
    swagger_controller :subscriptions, "Подписки(Subscriptions) на услуги"

    # для ability
    # сделано для before_action :new_subscribe, :only => [:create]
    def new_subscribe
      @subscription = Subscription.new(with_params)
    end

    # GET /subscriptions
    def index
      index_params
      param! :filter, Hash, default: [] do |f|
        f.param! :client_id, Array do |s, i|
          s.param! i, Integer, message: "ошибка параметра фильтра client_id"
        end

        param! :tariffs, Hash, default: [] do |tariff|
          tariff.param! :service_id, Array do |service, i|
            service.param! i, Integer, message: "ошибка параметра фильтра service_id"
          end
        end
      end

      subscriptions = Subscription
        .includes(:tariff, :client)
        .do_filter(get_params[:filter])
      has_active_subscribes = subscriptions.where(state: Subscription::STATE_ACTIVE).count
      subscriptions = subscriptions.order("#{params[:sort]} #{params[:order]}")
        .paginate(per_page: params[:limit], page: params[:page])

      meta = {total_pages: subscriptions.total_pages, has_active_subscribes: has_active_subscribes}
      render json: SubscriptionsPresenter.new(subscriptions: subscriptions || [], meta: meta)
    end

    def client_subscribes_paysystems_names
      actual_tariffs = ::Subscriptions::PaymentGate::PgBase.active_pg_subscribes.where(client_id: params[:client_id])
      payment_systems_names = actual_tariffs.map { |t| t.tariff.extra["payment_system"] }
      render json: payment_systems_names
    end

    def search
      param! :name, String, default: ""
      param! :client_id, Integer
      param! :limit, Integer, default: 50

      @subscriptions = Subscription.joins(tariff: [:service])
        .where(client_id: params[:client_id])
        .where("tariffs.name ilike ? or services.name ilike ?",
          "%#{params[:name]}%",
          "%#{params[:name]}%")
        .paginate(per_page: params[:limit], page: params[:page])
      @meta = {total_pages: @subscriptions.total_pages}

      render json: SubscriptionSearchPresenter.new(subscriptions: @subscriptions || [], meta: @meta)
    end

    # GET /subscriptions/1
    def show
      prefix = @subscription.service_ticket_tariff_class
      klass = "::Subscription::#{prefix}SubscriptionPresenter".constantize
      klass_subscribe = "::Subscriptions::#{prefix}::Subscription".constantize
      klass_subscription = klass_subscribe.find(@subscription.id)

      render json: klass.new(
        {subscription: klass_subscription, current_user: current_user}
      )
    end

    # :nocov:
    swagger_api :tmsupport do
      summary "получение остатка часов и минут по СТП"
      notes "получение остатка часов и минут по СТП"
      param :query, "service_id", :string, :optional, "id услуги (для СТП: для России это 2, Казахстана это 4)"
      param :query, "id", :string, :optional, "ID клиента"
      param :header, "Authentication-Token", :string, :required, "Authentication token"
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def tmsupport
      tariff_ids = Tariff.includes(:service).where(services: {id: params[:service_id]}).pluck(:id)
      subscription = Subscription.find_by(client_id: params[:client_id], tariff_id: tariff_ids,
        state: Subscription::STATE_ACTIVE)

      if subscription.present? && subscription.settings["hours"].present?
        render json: SubscriptionTmPresenter.new(subscription)
      else
        json_response(:ok)
      end
    end

    # Редактирование часов ТМ саппорта
    def tmsupport_edit
      tariff_ids = Tariff.includes(:service).where(services: {id: params[:service_id]}).pluck(:id)
      standard_subscription = Subscription.find_by(client_id: params[:client_id], tariff_id: tariff_ids,
        state: Subscription::STATE_ACTIVE)

      subscription = Subscriptions::TicketTariffDetector.call(standard_subscription)
      return render_bad_class unless subscription.present?

      before_count = subscription.settings["hours"].to_i
      subscription.settings["hours"] = subscription.settings["hours"].to_i + params["minutes"].to_i
      subscription.save

      Tmsupport::HandleHours.call(
        crm_id: subscription.client.crm.id,
        time: params["minutes"].to_i,
        before_count: before_count,
        after_count: subscription.settings["hours"].to_i,
        kind: Tmstat::KIND_CORRECTING,
        user_id: current_user.id
      )

      render json: subscription.settings["hours"]
    end

    # POST /subscriptions
    def create
      tariff = Tariff.find(params[:tariff_id])
      prefix = tariff.service.service_ticket_tariff_class
      klass = "::Subscriptions::#{prefix}::Subscription".constantize
      subscription = klass.new(send("#{prefix.downcase}_create_params"))

      if subscription.save
        presenter = "::Subscription::#{prefix}SubscriptionPresenter".constantize
        render json: presenter.new(
          {subscription: subscription, current_user: current_user}
        )
      else
        render json: subscription.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /subscriptions/1
    def update
      prefix = @subscription.service_ticket_tariff_class
      klass = "::Subscriptions::#{prefix}::Subscription".constantize
      subscription = klass.find(@subscription.id)
      subscription.update!(send("#{prefix.downcase}_update_params"))
      subscription.update!({jsondata: subscription.jsondata.merge(send("#{prefix.downcase}_update_jsondata").to_h["jsondata"])})
      json_response @subscription
    end

    # PATCH/PUT /subscriptions/1/activate
    def activate
      result = Subscriptions::V2::Activator.call(
        subscription: @subscription,
        user_id: current_user.id,
        transaction_type: 5,
        ip: _request_ip
      )

      if result.success?
        json_response({message: result.value!}, :ok)
      else
        json_response({message: result.failure}, :unprocessable_entity)
      end
    end

    # PATCH/PUT /subscriptions/1/suspend
    def suspend
      prefix = @subscription.service_ticket_tariff_class
      klass = "::Subscriptions::#{prefix}::Subscription".constantize
      subscription = klass.find(@subscription.id)
      subscription.shift_suspend!
      json_response
    end

    # :nocov:
    swagger_api :tmsupport do
      summary "Вкл/выкл автоматическую замену и активацию следующей по тарифу"
      notes ""
      param :query, "client_id", :string, :required, "id клиента"
      param :query, "id", :string, :required, "ID подписки"
      param :header, "Authentication-Token", :string, :required, "Authentication token"
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def auto_continue
      prefix = @subscription.service_ticket_tariff_class
      klass = "::Subscriptions::#{prefix}::Subscription".constantize
      subscription = klass.find(@subscription.id)
      subscription.shift_autocontinue!
      render json: {state: subscription.state}, status: :ok
    end

    def active_service_subscribes
      subscriptions = Subscription.actives_by_service_and_client(params[:client_id], params[:service_id])
      json_response({count: subscriptions.count}, :ok)
    end

    # PATCH/PUT /subscriptions/1/closed
    # при закрытии разрешено передавать в теле только дату закрытия ended_at,
    # перед сохранением выставляем время на полночь
    def close
      param! :ended_at, String, format: /\A([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))\Z/,
        message: "Требуется валидный формат даты YYYY-mm-dd"

      params[:ended_at] = DateTime.parse(params[:ended_at]).midnight
      prefix = @subscription.service_ticket_tariff_class
      klass = "::Subscriptions::#{prefix}::Subscription".constantize
      subscription = klass.find(@subscription.id)
      subscription.closed!
      subscription.update(closed_params)
      json_response
    end

    # GET /subscriptions/closed_and_renewed
    def closed_and_renewed
      param! :sort, String, in: ["created_at"], default: "created_at"
      param! :order, String, in: %w[asc desc], default: "asc"
      param! :page, Integer, default: 1, min: 1
      param! :limit, Integer, default: 30, min: 1, max: 30

      logs = AnaliticLogger
        .where(name: "autorenew_subscriptions")
        .paginate(per_page: get_params[:limit], page: get_params[:page])
        .order("#{get_params[:sort]} #{get_params[:order]}")

      render json: ::Subscription::ClosedAndRenewed::StatsPresenter.new(
        logs: ::Coersers::Subscriptions::StatsCoerser.call(logs: logs),
        meta: {pages: logs.total_pages}
      )
    end

    # GET /subscriptions/closed_and_renewed_details/:id
    def closed_and_renewed_details
      log = AnaliticLogger.find(params[:id])

      render json: ::Subscription::ClosedAndRenewed::DetailPresenter.new(log)
    end

    def admin_add_hours
      @subscription.settings["hours"] += params["settings"]["hours"]
      @subscription.update!(settings: @subscription.settings)
    end

    # GET /subscriptions/fetch_active_tmsupport/:client_id
    def fetch_active_tmsupport
      subscription = Subscriptions::Tehsupport::Subscription.active_stp_by_client(params[:client_id]).first
      return render json: {message: "Подписка не найдена"}, status: 404 unless subscription.present?

      render json: SubscriptionActivePresenter.new(subscription)
    end

    # :nocov:
    swagger_api :active_urgent_subscribe do
      summary "создать и активировать экстренную ТП"
      notes "создать и активировать экстренную ТП, без проверок - создать и попытаться активировать"
      param :form, "crm", :string, :optional, "CRM"
      param :header, "Authentication-Token", :string, :required, "Authentication token"
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def active_urgent_subscribe
      client = Client.includes(:crm).find_by(crms: {crm: params[:crm]})
      match_tariff = Tariffs::TariffUrgent.for_client_country(client.country.id).first
      unless match_tariff.present?
        return render json: {message: "Тариф не найден, обратитесь к менеджеру на создание тарифа"},
          status: 400
      end

      exists_urgent_subscribe = Subscription.find_by(
        tariff_id: match_tariff.id,
        client_id: client.id,
        state: Subscription::STATE_ACTIVE
      )

      if exists_urgent_subscribe.present?
        render json: exists_urgent_subscribe, status: 200
      else
        ActiveRecord::Base.transaction do
          subscription = ::Subscriptions::UrgentSubscribe.call(client: client, tariff: match_tariff)

          if subscription && Subscriptions::V2::Activator.call(
            subscription: subscription,
            user_id: current_user.id,
            transaction_type: Transaction::SOURCE_API,
            ip: "0.0.0.0"
          )
            render json: subscription, status: 200
          else
            render json: {message: "Ошибка активации Срочной подписки"}, status: 400
          end
        end
      end
    end

    def has_urgent_stp
      client = Client.includes(:crm).find_by(crms: {crm: params[:crm]})
      return render json: {message: "Клиент не найден"}, status: 400 unless client.present?

      match_tariff = Tariffs::TariffUrgent.for_client_country(client.country.id).first

      unless match_tariff.present?
        return render json: {message: "Тариф не найден, обратитесь к менеджеру на создание тарифа"},
          status: 400
      end
      exists_urgent_subscribe = Subscription.find_by(
        tariff_id: match_tariff.id,
        client_id: client.id,
        state: Subscription::STATE_ACTIVE
      )

      if exists_urgent_subscribe.present?
        render json: exists_urgent_subscribe, status: 200
      else
        render json: {message: "У клиента нет Срочной подписки"}, status: 404
      end
    end

    # DELETE /subscriptions/1
    def destroy
      @subscription.destroy
    end

    private

    def set_subscription
      @subscription = Subscription.includes(:client, tariff: [:service]).find(params[:id])
    end

    def with_params
      params.require(:subscription).permit(
        :client_id,
        :tariff_id,
        :credit_limit,
        :started_at,
        :ended_at,
        opsms_attributes: %i[id operator_id limit price _destroy],
        jsondata: %i[sms_login paid_on renewal custom_payment subscribe_price new_tariff new_tariff_hours
          new_tariff_slas monthly_fee comment],
        settings: %i[type hours overtime_price hours]
      )
    end

    def closed_params
      params.permit(:ended_at)
    end

    def get_params
      params.permit(:id, :service_id, :page, :limit, :sort, :order, filter: [client_id: [], tariffs: [:service_id]])
    end

    # делаем только для смены статуса
    def state_params
      params.require(:subscription).permit(
        :state
      )
    end

    # делаем только для добавления/вычитания часов
    def hours_params
      params.require(:subscription).permit(
        settings: [:hours]
      )
    end

    def resource_repository
      return Subscription if current_user.manager? || current_user.admin?

      Subscription.where(client_id: current_user.clients&.pluck(:id))
    end

    def filter_fields
      [
        :client_id,
        :service_id,
        {state: ->(model, val) { model.filter_state(val.split(",")) }}
      ]
    end

    def index_params
      param! :sort, String,
        in: %w[subscriptions.id tariffs.name subscriptions.started_at subscriptions.ended_at subscriptions.state], transform: :downcase, default: "subscriptions.id"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
      param! :limit, Integer, default: 50
      param! :page, Integer, default: 1
    end
  end
end
