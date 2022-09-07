# frozen_string_literal: true

class UsersPresenter < Presenter
  def initialize(object, presenter_options: nil)
    super
    if @object.is_a?(User) && @object.crms.present? &&
       Role.current_user_has_top_roles(presenter_options[:current_user])
      @client = @object.crms.first.clients.first
      @subscription = Subscriptions::Tehsupport::Subscription
                          .active_stp_by_client(@client).first
    end
  end

  def as_json(*_args)
    if @object.is_a?(User)
      {
        id: @object.id,
        email: @object.email,
        login: @object.login,
        name: @object.name,
        phone_number: @object.phone_number,
        client_props: client_props, # только для приритетных ролей
        techsupport_props: techsupport_props # только для приритетных ролей
      }.tap do |h|
        h[:employees] = @object.employees if presenter_options[:with_employees]
        if presenter_options[:with_roles]
          h[:roles] = @object.roles
          h[:user_role] = @object.user_role
        end
      end
    elsif @object.nil?
      {
        id: nil,
        email: nil,
        login: nil,
        name: 'удаленный пользователь',
        phone_number: nil
      }
    else
      @object.map { |o| UsersPresenter.new(o, presenter_options: presenter_options) }
    end
  end

  def client_props
    ClientCrmPresenter.new(@client) if @client.present?
  end

  def techsupport_props
    PresentersTechsupport::TechsupportPresenter.new(@subscription) if @subscription.present?
  end
end
