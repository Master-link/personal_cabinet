# frozen_string_literal: true

class Subscriptions::V2::Activator < ApplicationService
  NO_MONEY = "Недостаточно баланса на счете для активации подписки"
  CANNOT_ACTIVATE = "Ошибка смены статуса"
  SUCCESS_ACTIVATION = "Подписка активирована"
  SUCCESS_RENEW_ACTIVATION = "Подписка продлена"
  FAILURE_ACTIVATION = "Ошибка активации"
  FAILURE_RENEW_ACTIVATION = "Ошибка автопродления"
  TRANSACTION_ERROR = "Ошибка активации, ошибка транзакции"
  UNKNOWN_STATE = "Непонятный статус"

  def initialize(args)
    subscription = args.fetch(:subscription)
    @user_id = args.fetch(:user_id, nil)
    @transaction_type = args.fetch(:transaction_type)
    @ip = args.fetch(:ip)
    prefix = subscription.service_ticket_tariff_class
    klass = "::Subscriptions::#{prefix}::Subscription".constantize
    @subscription = klass.find(subscription.id)
    @subscription_is_renewed = false
    super()
  end

  def call
    return Failure(CANNOT_ACTIVATE) unless @subscription.may_activated?

    result = case @subscription.state.to_sym
    when Subscription::STATE_CONTINUE, Subscription::STATE_NEW
      return Failure(no_money) unless @subscription.enough_money_for_activating?

      new_subscription_activate
    when Subscription::STATE_RENEWAL
      unless @subscription.enough_money_for_activating?
        @subscription.closed!
        return Failure(no_money)
      end
      renew_subscription_activate
    else
      Failure({
        result: "#{UNKNOWN_STATE} #{@subscription.state}",
        subscription: @subscription.id,
        crm: @subscription.client.crm.crm,
        client_id: @subscription.client.id,
        service_id: @subscription.tariff.service_id,
        tariff_id: @subscription.tariff.id,
        state_now: @subscription.state
      })
    end

    if result.success?
      Success(result.value!)
    else
      Failure(result.failure || FAILURE_ACTIVATION)
    end
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    Failure(TRANSACTION_ERROR)
  end

  private

  def no_money
    {
      result: NO_MONEY,
      subscription: @subscription.id,
      crm: @subscription.client.crm.crm,
      client_id: @subscription.client.id,
      service_id: @subscription.tariff.service_id,
      tariff_id: @subscription.tariff.id,
      state_now: @subscription.state
    }
  end

  def new_subscription_activate
    result = Try do
      result = @subscription.on_activate
      return Failure(result.failure) if result.failure?

      if do_operations!
        Success()
      else
        @subscription.on_deactivate
        Failure()
      end
    end

    if result.error?
      Failure({
        result: FAILURE_ACTIVATION,
        subscription: @subscription.id,
        crm: @subscription.client.crm.crm,
        client_id: @subscription.client.id,
        service_id: @subscription.tariff.service_id,
        tariff_id: @subscription.tariff.id,
        state_now: @subscription.state
      })
    else
      Success({
        result: SUCCESS_ACTIVATION,
        subscription: @subscription.id,
        crm: @subscription.client.crm.crm,
        client_id: @subscription.client.id,
        service_id: @subscription.tariff.service_id,
        tariff_id: @subscription.tariff.id,
        state_now: @subscription.state
      })
    end
  end

  def renew_subscription_activate
    result = Try do
      result = @subscription.on_activate
      if result.failure?
        @subscription.closed!
        return Failure(result.failure)
      end

      if renew_subscription_do_operations!
        Success()
      else
        Failure()
      end
    end

    if result.value!.failure?
      @subscription.closed!
      @subscription.renewed!
      Failure({
        result: FAILURE_RENEW_ACTIVATION,
        subscription: @subscription.id,
        crm: @subscription.client.crm.crm,
        client_id: @subscription.client.id,
        service_id: @subscription.tariff.service_id,
        tariff_id: @subscription.tariff.id,
        state_now: @subscription.state
      })
    else
      Success({
        result: SUCCESS_RENEW_ACTIVATION,
        subscription: @subscription.id,
        crm: @subscription.client.crm.crm,
        client_id: @subscription.client.id,
        service_id: @subscription.tariff.service_id,
        tariff_id: @subscription.tariff.id,
        state_now: @subscription.state
      })
    end
  end

  def do_operations!
    ActiveRecord::Base.transaction do
      subtract_balance
      make_transaction
    end
  end

  def renew_subscription_do_operations!
    ActiveRecord::Base.transaction do
      if setup_periods!
        subtract_balance
        make_transaction
      else
        return false
      end
    end
  end

  def setup_periods!
    @subscription.update(
      {
        started_at: Time.zone.now,
        ended_at: @subscription.tariff.add_period(Time.zone.now).beginning_of_day
      }
    )

    if @subscription.valid?
      @subscription.save
    else
      @subscription.reload
      false
    end
  end

  def subtract_balance
    @subscription
      .service_balance
      .subtract_balance!(
        @subscription.common_payment_value
      )
  end

  def make_transaction
    Transaction.create!(
      client_id: @subscription.client_id,
      subscription_id: @subscription.id,
      service_id: @subscription.tariff.service.id,
      user_id: @user_id,
      money: -@subscription.common_payment_value,
      source: @transaction_type,
      detail: {ip: @ip}
    )
  end
end
