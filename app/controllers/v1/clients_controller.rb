# frozen_string_literal: true

module V1
  # An Clients Controller
  class ClientsController < ApplicationController
    swagger_controller :clients, "Clients Management"
    load_and_authorize_resource
    before_action :set_client,
      only: %i[
        update
        destroy
        services
        show
        get_roles_q_and_a
        roles_q_and_a
        search_available_services
        search_available_tariffs
      ]

    def index
      index_params
      sort_field =
        case params[:sort]
        when "crms.crm"
          "substring(crms.crm, '\\d+')::int"
        when "name"
          "clients.#{params[:sort]}"
        else
          params[:sort]
        end

      @clients =
        Client
          .includes(:crm)
          .left_outer_joins(:crm, :subscriptions)
          .select(
            "clients.id",
            "clients.email",
            "clients.name",
            "clients.organization",
            "clients.crm_id",
            "crms.crm",
            "subscriptions.count as subscriptions_count",
            "clients.settings"
          )
          .search_client(params[:filter][:search])
          .search_manager(params[:filter][:employee_id])
          .search_client_subscriptions(params[:filter][:state])
          .group(
            "clients.id",
            "clients.email",
            "clients.name",
            "clients.organization",
            "clients.crm_id",
            "crms.crm"
          )
          .order(Arel.sql("#{sort_field} #{params[:order]}"))
          .paginate(per_page: params[:limit], page: params[:page])

      @meta = {total_pages: @clients.total_pages}
      render json: ClientIndexPresenter.new(clients: @clients || [], meta: @meta)
    end

    def search
      index_params
      sort_field =
        case params[:sort]
        when "crms.crm"
          "substring(crms.crm, '\\d+')::int"
        when "name"
          "clients.#{params[:sort]}"
        else
          params[:sort]
        end
      @clients = Client
        .eager_load(:crm)
        .search_by_crm(params[:crm])
        .where("clients.name ilike ?", "%#{params[:name]}%")
        .order(Arel.sql("#{sort_field} #{params[:order]}"))
        .paginate(per_page: params[:limit], page: params[:page])
      @meta = {total_pages: @clients.total_pages}
      render json: ClientSearchPresenter.new(clients: @clients || [], meta: @meta)
    end

    def find_by_crm_id
      param! :crm_id, Integer, required: true
      client = Client.includes(:crm).find_by(crms: {crm: params_client[:crm_id]})
      json_response client, :ok
    end

    def show
      param! :id, Integer, required: true
      json_response @client, :ok
    end

    def update
      @client.update!(with_params)
      json_response @client, :ok
    end

    # :nocov:
    swagger_api :services do
      summary "поиск доступных услуг для создания документов или заявок на подписки(claims)"
      notes 'для первичных ролей выдает все услуги, для вторичных ролей только услуги у которых выставлен флаг.
<b>Разрешить</b> клиентам подписываться на услугу. Схож с запросом search_available_tariffs'
      param :path, "id", :string, :required, "ID клиента (не CRM)"
      param :header, "Authorization", :string, :required, "Authorization"
      response :unauthorized
      response :success
      response :unprocessable_entity
    end
    # :nocov:
    def services
      render json: PresentersClient::ClientServicePresenter.new(
        client: @client,
        services: ::Services::ClientServices.call(user: current_user, client: @client)
      )
    end

    def search_available_services
      param! :filter, Hash, required: true do |f|
        f.param! :name, String, default: ""
        f.param! :client_services_for_cities, Integer, required: true, message: "требуется ID клиента"
      end

      services = Service
        .filterize(params_filter_service)
        .order("name asc")
      render json: ServiceSearchWithAgreementPresenter.new(services: services)
    end

    # :nocov:
    swagger_api :search_available_tariffs do
      summary "поиск доступных тарифов для создания документов или заявок на подписки(claims)"
      notes 'для первичных ролей выдает все тарифы, для вторичных ролей только тарифы у которых выставлен флаг
Разрешить клиентам подписываться на услугу'
      param :path, "id", :string, :required, "ID клиента (не CRM)"
      param :path, "service_id", :string, :required, "ID услуги"
      param :header, "Authorization", :string, :required, "Authorization"
      response :unauthorized
      response :success
      response :unprocessable_entity
    end
    # :nocov:
    def search_available_tariffs
      render json: TariffSearchSimplePresenter.new(
        tariffs: ::Tariffs::ClientTariffs.call(
          user: current_user,
          client_id: params[:id],
          service_id: params[:service_id]
        )
      )
    end

    def roles_q_and_a
      Users::ManageQandaRoles.call(client_id: @client.id, role: q_and_a_params["role"])
      json_response
    end

    def get_roles_q_and_a
      users = @client.crm.users.includes(:roles)
      return render json: [] unless users.present?

      roles = []
      users.each do |user|
        roles << user.roles.map(&:name)
      end

      json_response roles.uniq.flatten || [""]
    end

    private

    def index_params
      param! :sort, String, in: %w[crms.crm name organization], transform: :downcase, default: "crms.crm"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
      param! :page, Integer, default: 1
      param! :limit, Integer, default: 50
      param! :filter, Hash, default: {} do |f|
        f.param! :search, String
        f.param! :employee_id, Integer
        f.param! :state, String, in: %w[
          state_new state_active state_limited state_suspend state_closed no_subscribes null
        ], transform: :downcase, default: "null"
      end
    end

    def set_client
      param! :id, Integer, required: true
      @client = Client.find(params[:id])
    end

    def with_params
      params.require(:client).permit(
        :country_id,
        :crm_id,
        :name,
        :organization,
        :employee_id,
        :platform_client_id,
        email: [],
        settings: %i[one_c_id alert_emails alert_phone utc_offset city]
      )
    end

    def params_client
      params.permit(
        :id,
        :crm_id,
        service_balances: [:service_id],
        filter: {service_balances: [:service_id]}
      )
    end

    def resource_repository
      Client
    end

    def filter_fields
      [
        :crm_id,
        {"user.id" => :by_user_id}
      ]
    end

    def q_and_a_params
      params.require(:clients).permit(
        :role
      )
    end

    def params_filter_service
      params.require(:filter).permit(
        :name, :client_services_for_cities
      )
    end
  end
end
