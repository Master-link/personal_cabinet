# frozen_string_literal: true

# An Users Controller
class UsersController < ApplicationController
  swagger_controller :users, "Users Management"
  authorize_resource only: %i[show update admin_create]

  skip_before_action :authorize_request, only: :create
  before_action :set_user, only: %i[show update crm destroy]
  before_action :set_user_mnp, only: %i[userinfo]

  def index
    param! :sort, String, in: %w[id name login email], transform: :downcase, default: "id"
    param! :order, String, in: %w[asc desc], transform: :downcase, default: "asc"
    param! :page, Integer, default: 1
    param! :limit, Integer, default: 20
    param! :filter, Hash, default: {client_id: []} do |f|
      f.param! :client_id, Array do |s, i|
        s.param! i, Integer, message: "ошибка параметра фильтра client_id"
      end
    end

    @users = User.includes(:roles, :employees).eager_load(:crms)

    if params[:filter][:client_id].present?
      client = Client.find_by(id: params[:filter][:client_id])
      @users = client.crm.users
    end

    @users = @users
      .search_user(params[:search])
      .filter_role(params[:role])
      .search_crm(params[:searchCrm])
      .search_strict_crm(params[:search_strict_crm])
      .order("users.#{params[:sort]} #{params[:order]}")
      .paginate(per_page: params[:limit], page: params[:page])
    @meta = {total_pages: @users.total_pages}

    render json: UsersIndexPresenter.new(users: @users, meta: @meta)
  end

  # :nocov:
  swagger_api :admin_create do
    summary "создание юзера"
    notes '<ul>
<li>для админа, для создания юзеров с разными ролями</li>
<li>если создаем с ролью руководитель или сотрудник - прикреплять к клиенту, иначе нет</li>
</ul>'
    param :query, "client_id", :string, "ID клиента (не CRM)"
    param :header, "Authorization", :string, :required, "Authorization"
    response :unauthorized
    response :success
    response :unprocessable_entity
  end
  # :nocov:
  def admin_create
    param! :client_id, Integer
    if params["client_id"].present?
      param! :role, String, in: Role::LEVEL_ONE_ROLES, transform: :downcase, required: true
    else
      param! :role, String, in: Role::LEVEL_ZERO_ROLES, transform: :downcase, required: true
    end

    ActiveRecord::Base.transaction do
      user = User.create!(admin_params)
      user.add_role(admin_params[:role])
      if %w[director employee client].include?(admin_params[:role]) && params["client_id"].present?
        client = Client.find(params["client_id"])
        user.crms << Crm.find(client.crm_id)
        manage_on_create(client)
      end
    end

    render json: "", status: :created
  end

  def crm
    client = Client.includes(:client_requisite).find_by(crm_id: @user.crms.first.id)

    render json: PresentersUser::ClientShortPresenter.new(client), status: :ok
  end

  def update
    param! :client_id, Integer
    if params["client_id"].present?
      param! :role, String, in: Role::LEVEL_ONE_ROLES, transform: :downcase, required: true
    else
      param! :role, String, in: Role::LEVEL_ZERO_ROLES, transform: :downcase, required: true
    end

    if user_params[:role].present?
      @user.roles = []
      @user.add_role user_params[:role]
    end
    if params[:employee_id].present?
      @user.employees = []
      @user.employees << (Employee.find_by(id: params[:employee_id]) || [])
    end
    @user.update!(user_params)
    json_response
  end

  # :nocov:
  swagger_api :show do
    summary "информация о юзере"
    notes "в query, client_id - используется для определения своего юзера, если запрос от клиента"
    param :query, "client_id", :string, :optional, "ID клиента (не CRM)"
    param :header, "Authorization", :string, :required, "Authorization"
    response :unauthorized
    response :success
    response :unprocessable_entity
  end
  # :nocov:
  def show
    render json: PresentersUser::UserInfoPresenter.new(@user), status: :ok
  end

  def userinfo
    render json: UserMnpPresenter.new(user: @user_mnp)
  end

  def destroy
    @user.destroy_without_paranoia
  end

  private

  def set_user
    @user = User.includes(:roles).find(params[:id])
  end

  def set_user_mnp
    @user_mnp = User.includes(:crms).find(params[:id])
  end

  def user_params
    params.permit(
      :name,
      :login,
      :email,
      :phone_number,
      :password,
      :password_confirmation,
      :role
    )
  end

  def admin_params
    params.permit(
      :name,
      :login,
      :email,
      :phone_number,
      :password,
      :password_confirmation,
      :role
    )
  end

  def manage_on_create(client)
    users = client.crm.users

    if users.count == 1
      Users::ManageQandaRoles.call(client_id: client.id, role: Role::ROLE_Q_AND_A_FORBIDDEN)
    else
      client.order_roles
    end
  end
end
