# frozen_string_literal: true

module Subscriptions
  class CheckOrCreateNotification < ApplicationService
    def initialize(args)
      @subscription = args.fetch(:subscription)
    end

    def call
      as = "::Subscriptions::#{@subscription.service.ticket["kind"].tr("-", "_").camelize}Creator".constantize.new
      # для каждой услуги создаются свои уведомления, если их нет
      as.call(@subscription)
    end
  end

  class Watcher
    def factory_method(_subscription)
      raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
    end

    def call(subscription)
      watcher = factory_method(subscription)
      watcher.call
    rescue => e
      raise NotImplementedError, e.message
    end
  end

  # Типы вариантов(kind) услуг - начало
  class SmsGateCreator < ::Subscriptions::Watcher
    def factory_method(subscription)
      ::AlertSettings::Kinds::SmsGate.new(subscription)
    end
  end

  class CallsBotCreator < ::Subscriptions::Watcher
    def factory_method(subscription)
      ::AlertSettings::Kinds::CallsBot.new(subscription)
    end
  end

  class CustomCreator < ::Subscriptions::Watcher
    def factory_method(subscription)
      ::AlertSettings::Kinds::Custom.new(subscription)
    end
  end

  class LicenseCreator < ::Subscriptions::Watcher
    def factory_method(subscription)
      ::AlertSettings::Kinds::License.new(subscription)
    end
  end

  class TechSupportCreator < ::Subscriptions::Watcher
    def factory_method(subscription)
      ::AlertSettings::Kinds::TechSupport.new(subscription)
    end
  end

  class TaxophoneCreator < ::Subscriptions::Watcher
    def factory_method(subscription)
      ::AlertSettings::Kinds::Taxophone.new(subscription)
    end
  end

  class PaymentGateCreator < ::Subscriptions::Watcher
    def factory_method(subscription)
      ::AlertSettings::Kinds::PaymentGate.new(subscription)
    end
  end
  # Типы вариантов(kind) услуг - конец
end
