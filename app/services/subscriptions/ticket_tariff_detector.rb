# Subscriptions
module Subscriptions
  class TicketTariffDetector < ApplicationService
    attr_accessor :subscribe

    def initialize(subscription)
      @subscribe = subscription
    end

    def call
      prefix = subscribe.service_ticket_tariff_class
      return unless prefix.present?
      return unless class_exists?("::Subscriptions::#{prefix}::Subscription")

      klass = "::Subscriptions::#{prefix}::Subscription".constantize
      return unless klass.present?

      klass.find(subscribe.id)
    end

    private

    def class_exists?(class_name)
      klass = Module.const_get(class_name)
      klass.is_a?(Class)
    rescue NameError
      false
    end
  end
end
