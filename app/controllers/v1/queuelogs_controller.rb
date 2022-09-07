module V1
  class QueuelogsController < ApplicationController
    authorize_resource
    swagger_controller :queuelogs, "Менеджер очередей (Queuelog)"

    # :nocov:
    swagger_api :index do
      summary "список очередей"
      notes "список очередей"
      param :header, "Authentication-Token", :string, :required, "Authentication token"
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def index
      param! :name, String, in: %w[change_tariff], default: "change_tariff"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "desc"
      param! :limit, Integer, default: 50, min: 1, max: 100
      param! :sort, String, in: %w[id created_at started_at finished_at], transform: :downcase, default: "finished_at"

      render json: {
        data: Queuelog
          .where(name: params[:name])
          .order(Arel.sql("#{params[:sort]} #{params[:order]}"))
          .limit(params[:limit])
      }, status: :ok
    end

    # :nocov:
    swagger_api :destroy do
      summary "удалить очередь"
      notes "удалить очередь"
      param :query, "id", :string, :optional, "ID записи"
      param :header, "Authentication-Token", :string, :required, "Authentication token"
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def destroy
      scheduled = Sidekiq::ScheduledSet.new.select
      queuelog = Queuelog.find_by(id: params[:id])
      scheduled.map do |job|
        job.delete if job.jid == queuelog.result["jid"]
      end
      queuelog.cancel!

      queuelog.result["result"] = "Отменен"
      queuelog.finished_at = DateTime.current
      queuelog.save

      Subscription
        .where(
          tariff: queuelog.result["new_tariff"],
          state: Subscription::STATE_CONTINUE
        )
        .update_all(
          state: Subscription::STATE_CLOSED, ended_at: DateTime.current
        )

      head :ok
    end

    private

    # Only allow a trusted parameter "white list" through.
    def queuelog_params
      params.require(:queuelog).permit(:name)
    end
  end
end
