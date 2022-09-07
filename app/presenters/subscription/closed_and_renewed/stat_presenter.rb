# frozen_string_literal: true

class Subscription::ClosedAndRenewed::StatPresenter < Presenter
  def as_json(*)
    {
      id: @object[:id],
      closed: @object[:closed],
      renewed: @object[:renewed],
      formatted_date: @object[:date].strftime('%d.%m.%Y'),
      created_at: @object[:date]
    }
  end
end
