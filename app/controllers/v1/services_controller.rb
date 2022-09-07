# frozen_string_literal: true

module V1
  # An Services Controller
  class ServicesController < ApplicationController
    authorize_resource
    before_action :set_service, only: %i[show update destroy]

    # экшен для Техсаппорта - не удалять
    # GET /services/for/:crm_id
    def for_crm
      c = Client.includes({ subscriptions: :service }, :crm).find_by(crms: { crm: params[:crm_id] })
      render json: ServicesForCrmPresenter.new(data: c)
    end

    # GET /services
    def index
      index_params

      client = Client.find get_params[:filter][:subscriptions][:client_id]
      client.services.each do |service|
        ServiceBalance.check_service_balance(
          client_id: get_params[:filter][:subscriptions][:client_id],
          service_id: service.id
        )
      end

      services = Service.includes(:service_balances, :subscriptions, :currency)
                        .where(service_balances: { client_id: get_params[:filter][:subscriptions][:client_id] })
                        .where(subscriptions: { client_id: get_params[:filter][:subscriptions][:client_id] })
                        .paginate(per_page: get_params[:limit], page: get_params[:page])
                        .order("#{get_params[:sort]} #{get_params[:order]}")

      meta = { total_pages: services.total_pages }
      render json: ServicesPresenter.new(services: services || [], meta: meta)
    end

    def list_services
      list_services_params

      services = Service
                 .paginate(per_page: get_params[:limit], page: get_params[:page])
                 .order("#{get_params[:sort]} #{get_params[:order]}")

      meta = { total_pages: services.total_pages }
      render json: ServicesIndexPresenter.new(services: services || [], meta: meta)
    end

    # Поиск услуг для заданной страны
    # Передается параметр client_id - надодим его страну
    # и находим все сервисы для этой страны
    def search_autocomplete
      country = Client.find(params[:client_id]).country
      @services = country.services.where('services.name ilike ?', "%#{params[:name]}%")
                         .paginate(per_page: 20, page: params[:page])
                         .order('name asc')
      @meta = { total_pages: @services.total_pages }
      render json: ServiceSearchPresenter.new(services: @services, meta: @meta)
    end

    # Чуть схожее с search_autocomplete, отличие:
    # после поиска клиента, найти все id услуг, где есть не закрытые подписки
    # находим все услуги по стране клиента
    def search_autocomplete_active_subscriptions
      client = Client.includes(:country).find(params[:client_id])
      service_ids = client.unclosed_service_ids

      @services = client.country.services.where('services.name ilike ?', "%#{params[:name]}%")
                        .where(services: { id: service_ids })
                        .paginate(per_page: 20, page: params[:page])
                        .order('name asc')
      @meta = { total_pages: @services.total_pages }
      render json: ServiceSearchPresenter.new(services: @services, meta: @meta)
    end

    def list
      @services = Service.all
      render json: ServiceSearchPresenter.new(services: @services, meta: [])
    end

    # GET /services/1
    def show
      json_response(@service, :ok)
    end

    # POST /services
    def create
      Service.create!(with_params)
      json_response '', :created
    end

    # PATCH/PUT /services/1
    def update
      @service.update!(with_params)
      json_response
    end

    # DELETE /services/1
    def destroy
      @service.destroy
      json_response
    end

    private

    def resource_repository
      return Service if current_user.manager? || current_user.admin?

      Service.none
    end

    def index_params
      list_services_params
      param! :filter, Hash, default: {} do |f|
        f.param! :subscriptions, Hash, default: {} do |fs|
          fs.param! :client_id, Integer
        end
      end
    end

    def list_services_params
      param! :sort, String, in: %w[services.id services.name], transform: :downcase, default: 'services.id'
      param! :order, String, in: %w[asc desc], transform: :downcase, default: 'asc'
      param! :page, Integer, default: 1, message: 'страница должна быть целым числом'
      param! :limit, Integer, default: 50
    end

    def set_service
      @service = Service.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def with_params
      params.permit(
        :currency_id,
        :legal_entity_id,
        :name,
        :state,
        :alert_template_email,
        :alert_template_sms,
        :notify_expires_days,
        :agreement,
        country_ids: [],
        ticket: {}
      )
    end

    def get_params
      params.permit(:page, :sort, :order, :limit, filter: [subscriptions: [:client_id], service_balances: [:client_id]])
    end
  end
end
