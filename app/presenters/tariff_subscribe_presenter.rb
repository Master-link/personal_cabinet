# frozen_string_literal: true

# A tariff presenter
class TariffSubscribePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      kind: @object.kind,
      duration_kind: @object.duration_kind,
      started_at: @object.started_at,
      ended_at: @object.ended_at,
      extra: @object.extra,
      opsms_attributes: @object.opsms,
      advance_payment: @object.advance_payment,
      settings: @object.settings
    }
  end
end
