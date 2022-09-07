module Subscriptions
  class ChangeActiveSmsSubscriptuions < ApplicationService
    attr_accessor :old_tariff, :new_tariff, :changed_at

    def initialize(args)
      @old_tariff = Tariff.find(args.fetch(:old_tariff_id))
      @new_tariff = Tariff.find(args.fetch(:new_tariff_id))
      @changed_at = args.fetch(:changed_at)
    end

    def call
      return unless tariff_is_not_sms?
      return unless equal_services?
      return if equal_tariffs?
      return if correct_datetime.nil?

      old_active_subscrioption_ids = Subscription
        .where(tariff: @old_tariff, state: Subscription::STATE_ACTIVE, ended_at: nil)
        .pluck(:id)
      Subscription
        .where(
          tariff: @new_tariff,
          state: Subscription::STATE_CONTINUE
        )
        .update_all(
          state: Subscription::STATE_ACTIVE, started_at: correct_datetime
        )

      Subscription
        .where(
          tariff: @old_tariff,
          state: Subscription::STATE_ACTIVE,
          ended_at: nil
        )
        .update_all(
          state: Subscription::STATE_CLOSED, ended_at: correct_datetime
        )

      new_active_subscrioption_ids = Subscription
        .where(tariff: @new_tariff, state: Subscription::STATE_ACTIVE)
        .pluck(:id)
      {
        old_active_subscrioption_ids: old_active_subscrioption_ids,
        new_active_subscrioption_ids: new_active_subscrioption_ids
      }
    end

    private

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
      DateTime.parse(@changed_at)
    rescue
      nil
    end
  end
end
