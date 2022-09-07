module V1
  class OperatorsController < ApplicationController
    authorize_resource
    before_action :set_operator, only: %i[show update destroy]

    def index
      param! :page, Integer, default: 1
      param! :filter, Hash, default: [] do |f|
        f.param! :kind, Array do |s, i|
          s.param! i, Integer, message: "ошибка параметра фильтра типа оператора"
        end
      end
      @operators = Operator.do_filter(get_params[:filter]).paginate(per_page: 20, page: params[:page])
      @meta = {total_pages: @operators.total_pages}

      render json: OperatorsPresenter.new(operators: @operators, meta: @meta)
    end

    def show
      render json: @operator
    end

    def create
      @operator = Operator.new(operator_params)

      if @operator.save
        render json: @operator, status: :created, location: @operator
      else
        render json: @operator.errors, status: :unprocessable_entity
      end
    end

    def update
      if @operator.update(operator_params)
        render json: @operator
      else
        render json: @operator.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @operator.destroy
    end

    private

    def set_operator
      @operator = Operator.find(params[:id])
    end

    def operator_params
      params.require(:operator).permit(:name, :title)
    end

    def get_params
      params.permit(:page, :sort, :order, filter: [kind: []])
    end
  end
end
