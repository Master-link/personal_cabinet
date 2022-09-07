# frozen_string_literal: true

module V1
  # An AlertSettings Controller
  class AlertSettingsController < ApplicationController
    authorize_resource
    load_and_authorize_resource
    before_action :set_alert_setting, only: %i[update]
    swagger_controller :alert_settings, "API для работы с уведомлениями для клиента AlertSetting"

    # :nocov:
    swagger_api :index do
      summary "список уведомлений клиента"
      notes "список уведомлений клиента"
      param :query, "filter[client_id]", :string, :required, "Client ID"
      param :query, "sort", :string, :optional, "Поле сортировки (id name alert_type), по умолчанию name"
      param :query, "order", :string, :optional, "Направление сортировки (asc, desc), по умолчанию asc"
      param :query, "page", :string, :optional, "Страница"
      param :query, "limit", :string, :optional, "Лимит записей на странице"
      param :header, "Authentication-Token", :string, :required, "Authentication token"
      response :unauthorized
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def index
      param! :sort, String, in: %w[id name alert_type], transform: :downcase, default: "name"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
      param! :page, Integer, default: 1

      @alert_settings = AlertSetting
        .includes(:client)
        .do_filter(index_params[:filter])
        .order("#{params[:sort]} #{params[:order]}")
        .paginate(per_page: params[:limit], page: params[:page])
      @meta = {total_pages: @alert_settings.total_pages}

      render json: PresentersAlertSetting::AlertSettingsPresenter.new(
        alert_settings: @alert_settings,
        meta: @meta
      )
    end

    # :nocov:
    swagger_api :update do
      summary "обновить уведомление"
      notes "обновить уведомление"
      param :query, "filter[client_id]", :string, :optional, "Client ID"
      param :form, "email_enabled", :string, :optional, "Отправить уведомления на почту"
      param :form, "sms_enabled", :string, :optional, "Отправить смс на почту"
      param :form, "setting", :string, :optional, "навтройки уведомления"
      param :header, "Authentication-Token", :string, :required, "Authentication token"
      response :unauthorized
      response :ok
      response :unprocessable_entity
    end
    # :nocov:
    def update
      if @alert_setting.update(alert_setting_params)
        render json: PresentersAlertSetting::AlertSettingPresenter.new(
          @alert_setting
        )
      else
        render json: @alert_setting.errors, status: :unprocessable_entity
      end
    end

    private

    def index_params
      params.permit(:page, :sort, :order, :limit, filter: [:client_id])
    end

    def set_alert_setting
      @alert_setting = AlertSetting.find(params[:id])
    end

    def alert_setting_params
      params.require(:alert_setting).permit(
        :email_enabled, setting: {}
      )
    end
  end
end
