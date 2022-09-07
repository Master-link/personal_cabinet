# frozen_string_literal: true

module V1
  class NomenclaturesController < ApplicationController
    authorize_resource
    before_action :set_nomenclature, only: %i[show update destroy]

    def index
      @nomenclatures = Nomenclature.all
      json_response paginate(@nomenclatures)
    end

    def search_autocomplete
      nomenclatures = Nomenclature
        .where("nomenclatures.name ilike ?", "%#{params[:name]}%")
        .order("name asc")
      @meta = {total_pages: 1}
      render json: NomenclatureSearchPresenter.new(nomenclatures: nomenclatures, meta: @meta)
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_nomenclature
      @nomenclature = Nomenclature.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def with_params
      params.require(:nomenclature).permit(:code, :name)
    end
  end
end
