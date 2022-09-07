# frozen_string_literal: true

class ClaimPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      client: {
        id: @object.client.id,
        name: @object.client.name,
        crm: @object.client.crm.crm,
      },
      service: {
        id: @object.service.id,
        name: @object.service.name,
      },
      tariff: {
        id: @object.tariff.id,
        name: @object.tariff.name,
      },
      date_activation: @object.date_activation,
      comment: @object.comment,
      state: @object.state,
      created_at: @object.created_at
    }
  end
end
