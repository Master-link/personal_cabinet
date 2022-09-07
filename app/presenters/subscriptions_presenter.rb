# frozen_string_literal: true

# Для Subscriptions->index
class SubscriptionsPresenter < Presenter
  def as_json(*)
    {
      subscriptions: @object[:subscriptions].map { |o| SubscriptionsDetailPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
