# frozen_string_literal: true

module V1
  class LegalEntitiesController < ApplicationController
    authorize_resource
    before_action :set_legal_entity, only: %i[show update destroy]

    def index
      param! :sort, String, in: %w[id name director_name], transform: :downcase, default: "id"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
      param! :page, Integer, default: 1

      @legal_entities = LegalEntity
        .order("#{params[:sort]} #{params[:order]}")
        .paginate(per_page: 15, page: params[:page])

      render json: @legal_entities, adapter: :json, meta: {total_pages: @legal_entities.total_pages}
    end

    def search
      @legal_entities = LegalEntity.where("legal_entities.name ilike ?", "%#{params[:name]}%")
        .paginate(per_page: 15, page: params[:page])
      @meta = {total_pages: @legal_entities.total_pages}
      render json: LegalEntitySearchPresenter.new(legal_entities: @legal_entities, meta: @meta)
    end

    def show
      json_response @legal_entity, :ok
    end

    def create
      LegalEntity.create!(with_params)
      json_response "", :created
    end

    def update
      @legal_entity.update!(with_params)
      json_response
    end

    def destroy
      @legal_entity.destroy
    end

    private

    def set_legal_entity
      @legal_entity = LegalEntity.find(params[:id])
    end

    def with_params
      params.require(:legal_entity).permit(
        :name, :inn, :kpp, :address, :checking_account, :bank_name, :bik, :account,
        :director_name, :director_name_sign, :bank_account, :phone, :accountant, :stamp_url
      )
    end
  end
end
