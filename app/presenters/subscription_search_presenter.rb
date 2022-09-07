# frozen_string_literal: true

# A SubscriptionSearchPresenter presenter
class SubscriptionSearchPresenter < Presenter
  def as_json(*)
    {
      data: @object[:subscriptions].map { |o| SubscriptionPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
