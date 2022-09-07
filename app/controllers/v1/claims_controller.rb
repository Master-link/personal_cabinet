module V1
  class ClaimsController < ApplicationController
    authorize_resource
    before_action :set_claim, only: %i[approve show update refuse]

    def index
      param! :sort,     String, in: %w[id services.name tariffs.name], default: 'id'
      param! :order,    String, in: %w[asc desc], transform: :downcase, default: 'asc'
      param! :limit,    Integer, default: 50
      param! :page,     Integer, default: 1
      param! :filter, Hash do |f|
        f.param! :state, String, in: Claim::ALL_STATES, transform: :downcase
      end

      claims = Claim.includes(:client, :service, :tariff)
                    .do_filter(filter_params[:filter])
                    .order("#{params[:sort]} #{params[:order]}")
                    .paginate(per_page: params[:limit], page: params[:page])
      meta = { total_pages: claims.total_pages }

      render json: ClaimsIndexPresenter.new(claims: claims, meta: meta)
    end

    def create
      claim = Claim.create!(with_params)
      if claim
        begin
          service = Service.find(claim.service_id)
          tariff = Tariff.find(claim.tariff_id)

          if service&.ticket['allow_subscribe'] &&
             tariff&.extra['allow_client_subscription'] &&
             !service&.ticket['require_submit_client'] &&
             !tariff&.extra['allow_with_confirmation']

            ActiveRecord::Base.transaction do
              Subscription.create!({
                                     client_id: claim.client_id,
                                     tariff_id: claim.tariff_id,
                                     started_at: claim.date_activation,
                                     ended_at: Tariff.find_by(id: claim.tariff_id).add_period(claim.date_activation)
                                   })
              claim.state = Claim::STATE_APPROVED
              claim.save
            end
            json_response({ message: "Услуга #{service.name} успешно создана и активирована" }, :created)
          else
            # send email
            json_response(
              { message: "Заявка на подключение услуги #{service.name} успешно создана. Для активации подписки в ближайшее время с вами свяжется ваш менеджер" }, :created
            )
          end
        rescue StandardError => e
          json_response(
            { message: 'Ошибка при создании заявки на подписку' }, 422
          )
        end
      end
    end

    def update
      @claim.update!(with_params)
      json_response '', :success
    end

    def show
      render json: PresentersClaim::ShowPresenter.new(claim: @claim)
    end

    def count_new
      json_response({ count: Claim.where(state: Claim::STATE_NEW).count }, 200)
    end

    def approve
      @claim.update!({ state: Claim::STATE_APPROVED })
      json_response({ message: 'Заявка одобрена' }, 200)
    end

    def refuse
      @claim.update!({ state: Claim::STATE_REFUSED })
      json_response({ message: 'Заявка отклонена' }, 200)
    end

    private

    def set_claim
      @claim = Claim.find(params[:id])
    end

    def with_params
      params.require(:claim).permit(
        :client_id,
        :service_id,
        :tariff_id,
        :date_activation,
        :comment
      )
    end

    def filter_params
      params.permit(
        filter: [:state]
      )
    end
  end
end
