# frozen_string_literal: true

class Subscription::ClosedAndRenewed::DetailPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      closed: @object.log['terminated'],
      renewed: @object.log['renewed'],
      created_at: @object.created_at
    }
  end
end
