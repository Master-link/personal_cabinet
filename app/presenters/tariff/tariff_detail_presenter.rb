# frozen_string_literal: true

# A tariff presenter
class Tariff
  class TariffDetailPresenter < Presenter
    def as_json(*)
      {
        id: @object.id,
        name: @object.name,
        started_at: @object.started_at,
        ended_at: @object.ended_at,
        kind: @object.kind,
        duration_kind: @object.duration_kind,
        advance_payment: @object.advance_payment,
        settings: @object.settings,
        extra: @object.extra,
        service: @object.service,
        nomenclatures: @object.nomenclatures,
        opsms_attributes: @object.opsms.map { |o| ::OpsmsPresenter.new(o) }
      }
    end
  end
end
