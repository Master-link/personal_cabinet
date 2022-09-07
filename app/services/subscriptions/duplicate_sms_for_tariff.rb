module Subscriptions
  class DuplicateSmsForTariff < ApplicationService
    attr_accessor :old_tariff, :new_tariff, :started_at

    def initialize(args)
      @old_tariff = Tariff.find(args.fetch(:old_tariff_id))
      @new_tariff = Tariff.find(args.fetch(:new_tariff_id))
      @started_at = args.fetch(:started_at)
    end

    def call
      return unless tariff_is_not_sms?
      return unless equal_services?
      return if equal_tariffs?
      return if correct_datetime.nil?

      fetch_old_subscriptions.each do |subscription|
        next if Subscription.find_by(
          tariff: @new_tariff,
          client_id: subscription.client_id,
          state: Subscription::STATE_CONTINUE,
          started_at: correct_datetime.beginning_of_day
        ).present?

        new_subscription = subscription.dup
        new_subscription.tariff = @new_tariff
        new_subscription.state = Subscription::STATE_CONTINUE
        new_subscription.started_at = correct_datetime.beginning_of_day
        new_subscription.ended_at = new_subscription.tariff_periodic? ? correct_datetime + 1.year : nil
        new_subscription.created_at = DateTime.now
        new_subscription.updated_at = DateTime.now
        new_subscription.save
        add_opsms(new_subscription)
      end
      true
    rescue => e
      raise StandardError, e.message
    end

    private

    def fetch_old_subscriptions
      @fetch_old_subscriptions = @old_tariff
        .build_subscription
        .includes(:client)
        .actives
        .where(tariff: @old_tariff)
    end

    # добавить тарифы к новым подпискам с нового тарифа
    def add_opsms(subscription)
      return unless subscription

      @new_tariff.opsms.each do |opsm|
        new_opsm = opsm.dup
        new_opsm.update!(smsable_type: "Subscription", smsable_id: subscription.id)
      end
    end

    def equal_services?
      @old_tariff.service == @new_tariff.service
    end

    def equal_tariffs?
      @old_tariff == @new_tariff
    end

    def tariff_is_not_sms?
      @old_tariff.service.is_sms_service?
    end

    def correct_datetime
      DateTime.parse(@started_at)
    rescue
      nil
    end
  end
end
