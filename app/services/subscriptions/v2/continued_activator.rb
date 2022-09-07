class Subscriptions::V2::ContinuedActivator < ApplicationService
  attr_accessor :terminated_subscriptions, :renewed_subscriptions, :actual_datetime

  def initialize(args)
    @terminated_subscriptions = args.fetch(:terminated)
    @renewed_subscriptions = args.fetch(:renewed)
    @actual_datetime = args.fetch(:actual_datetime).to_date
  end

  def call
    have_to_activate
  end

  private

  def only_closed_subscription_ids
    @terminated_subscriptions.map do |subscription|
      subscription[:subscription]
    end - @renewed_subscriptions.map do |subscription|
      subscription[:subscription]
    end
  end

  def clients_for_tariff
    result_hash = {}
    @terminated_subscriptions.each do |subscription|
      (result_hash[subscription[:client_id]] ||= []) << subscription[:tariff_id] if
        only_closed_subscription_ids.include?(subscription[:subscription])
    end
    result_hash
  end

  def subscriptions_for_activate
    Subscription
      .select(
        :tariff_id,
        :client_id,
        Arel.sql('array_agg(id) as ids')
      )
      .where("state like 'state_continue' and date_trunc('day', started_at) = ?", @actual_datetime)
      .group(:tariff_id, :client_id, :state, :started_at)
      .having(
        Arel.sql("count('subscriptions.client_id') = 1")
      ).map do |subscription|
      next unless clients_for_tariff[subscription.client_id]&.include?(subscription.tariff_id)

      subscription['ids'].first
    end
  end

  def have_to_activate
    Subscription.where(id: subscriptions_for_activate)
  end
end
