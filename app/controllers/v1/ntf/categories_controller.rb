# frozen_string_literal: true

module V1
  module Ntf
    class CategoriesController < ApplicationController
      authorize_resource class: "::Ntf::Category"

      def index
        param! :limit, Integer, default: ::Ntf::CATEGORIES_PER_PAGE
        param! :page, Integer, default: 1
        param! :sort, String, in: %w[id], transform: :downcase, default: "id"
        param! :order, String, in: %w[asc desc], transform: :downcase, default: "desc"

        categories = ::Ntf::Category
          .order("#{params[:sort]} #{params[:order]}")
          .paginate(per_page: params[:limit], page: params[:page])

        meta = {total_pages: categories.total_pages}
        render json: ::Ntf::CategoriesPresenter.new(categories: categories, meta: meta)
      end
    end
  end
end
