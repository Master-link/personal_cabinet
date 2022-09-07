# frozen_string_literal: true

module V1
  class EmployeesController < ApplicationController
    before_action :set_employee, only: %i[show update destroy]

    def index
      index_params
      related_users = User.includes(:employees).where.not("employees_users.user_id" => nil).pluck(:employee_id)
      @employees = Employee
        .where.not(id: related_users)
        .where("category > ?", 0)
        .order("employees.#{get_params[:sort]} #{get_params[:order]}")
        .paginate(per_page: get_params[:limit], page: get_params[:page])
      @meta = {total_pages: @employees.total_pages}

      render json: CrmEmployeesPresenter.new(data: @employees || [], meta: @meta)
    end

    def managers
      @employees = Employee.where("category > ?", 0).order("employees.name asc")
      render json: CrmEmployeesPresenter.new(data: @employees || [])
    end

    def show
      render json: @employee
    end

    def create
      @employee = Employee.new(employee_params)

      if @employee.save
        render json: @employee, status: :created, location: @employee
      else
        render json: @employee.errors, status: :unprocessable_entity
      end
    end

    def update
      if @employee.update(employee_params)
        render json: @employee
      else
        render json: @employee.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @employee.destroy
    end

    private

    def index_params
      param! :sort, String, in: %w[id], transform: :downcase, default: "id"
      param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
      param! :page, Integer, default: 1, message: "страница должна быть целым числом"
      param! :limit, Integer, default: 50
    end

    def get_params
      params.permit(:page, :sort, :order, :limit)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def employee_params
      params.require(:employee).permit(:crm, :name, :category)
    end
  end
end
