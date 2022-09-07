# frozen_string_literal: true

# Для Subscriptions->index
class Subscription::ClosedAndRenewed::StatsPresenter < Presenter
  def as_json(*)
    {
      data: @object[:logs].map { |o| Subscription::ClosedAndRenewed::StatPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
