# frozen_string_literal: true

class IdNamePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      allow_subscribe: @object.ticket["allow_subscribe"],
      require_submit_client: @object.ticket["require_submit_client"]
    }
  end
end
