# frozen_string_literal: true

# A tariff index presenter
class TariffIndexPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      duration_kind: @object.duration_kind,
      kind: @object.kind,
      advance_payment: @object.advance_payment,
      started_at: @object.started_at,
      ended_at: @object.ended_at,
      state: @object.state,
      service: ServicePresenter.new(@object.service)
    }
  end
end
