# frozen_string_literal: true

module V1
  # An tariffs Controller
  class TariffsController < ApplicationController
    authorize_resource
    before_action :set_tariff, only: %i[show update destroy]
    swagger_controller :tariffs, 'Tariffs Management'

    # GET /tariffs
    def index
      param! :sort,     String, in: %w[id name started_at], transform: :downcase, default: 'id'
      param! :order,    String, in: %w[asc desc], transform: :downcase, default: 'asc'
      param! :page,     Integer, default: 1
      param! :limit,    Integer, default: 50

      @tariffs = Tariff
                 .without_deleted
                 .includes(service: :currency)
                 .do_filter(get_params[:filter])
                 .order("ended_at desc, #{params[:sort]} #{params[:order]}")
                 .paginate(per_page: params[:limit], page: params[:page])
      @meta = { total_pages: @tariffs.total_pages }
      render json: TariffsIndexPresenter.new(tariffs: @tariffs, meta: @meta)
    end

    def search_autocomplete
      param! :sort, String, in: %w[tariffs.created_at tariffs.name], transform: :downcase, default: 'tariffs.created_at'
      param! :order, String, in: %w[asc desc], transform: :downcase, default: 'asc'
      param! :limit, Integer, default: 50, min: 1, max: 100
      if params[:client_id]
        client = Client.find params[:client_id]
        @tariffs = client.tariffs
      else
        @tariffs = Tariff.without_deleted
      end
      @tariffs = @tariffs
                 .where('tariffs.name ilike ?', "%#{params[:name]}%")
                 .where('tariffs.ended_at >= ? OR tariffs.ended_at IS NULL', DateTime.now)
                 .where(service_id: params[:service_id])
                 .order(Arel.sql("#{params[:sort]} #{params[:order]}"))
                 .paginate(per_page: params[:limit], page: params[:page])

      @meta = { total_pages: @tariffs.total_pages }
      render json: TariffSearchPresenter.new(tariffs: @tariffs, meta: @meta)
    end

    # :nocov:
    swagger_api :count_active_subscriptions do
      summary 'количество активных подписок по тарифу'
      notes 'количество активных подписок по тарифу'
      param :path, 'id', :string, :required, 'ID тарифа'
      param :header, 'Authentication-Token', :string, :required, 'Authentication token'
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def count_active_subscriptions
      render json: {
        data: Subscription
          .where(tariff_id: params[:id], state: Subscription::STATE_ACTIVE)
          .count
      }
    end

    # :nocov:
    swagger_api :create_subscription_duplicates do
      summary 'создать дубликаты подписок, на замену старым подпискам'
      notes 'иногда возникает задача, закрыть активные подписки с одним тарифом, и перевести подписки на другой тариф,
в определенную дату. Этот экшен создает дубликаты подписок со статусом state_new. Эта реализация рассчитана только на
подписки СМС'
      param :query, 'from', :string, :optional, 'из тарифа'
      param :query, 'to', :string, :optional, 'на тариф'
      param :query, 'started_at', :string, :optional, 'дата смены тарифов подписок'
      param :header, 'Authentication-Token', :string, :required, 'Authentication token'
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def create_subscription_duplicates
      param! :from, Integer, required: true
      param! :to, Integer, required: true
      param! :started_at, Date, required: true

      Subscriptions::DuplicateSmsForTariff.call(
        old_tariff_id: params[:from],
        new_tariff_id: params[:to],
        started_at: params[:started_at].strftime('%Y-%m-%d')
      )
      head :ok
    end

    def fetch_singular
      client = Client.includes(:crm).find_by(id: params[:client_id])
      match_tariff = Tariffs::TariffUrgent.for_client_country(client.country.id).first
      unless match_tariff.present?
        return render json: { message: 'Тариф не найден, обратитесь к менеджеру на создание тарифа' },
                      status: 400
      end
      render json: TariffPresenter.new(match_tariff)
    end

    # GET /tariffs/1
    def show
      render json: TariffInfoPresenter.new(tariff: @tariff)
    end

    # POST /tariffs
    def create
      Tariff.create!(with_params)
      json_response '', :created
    end

    # PATCH/PUT /tariffs/1
    def update
      @tariff.update!(with_params)
      json_response
    end

    # DELETE /tariffs/1
    def destroy
      @tariff.destroy
      json_response
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_tariff
      @tariff = Tariff.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def with_params
      params.require(:tariff).permit(
        :service_id,
        :name,
        :started_at,
        :ended_at,
        :kind,
        :duration_kind,
        :advance_payment,
        opsms_attributes: %i[id operator_id limit price],
        settings: {},
        extra: {}
      )
    end

    def get_params
      params.permit(:page, :sort, :order, :limit, filter: [:service_id])
    end
  end
end
