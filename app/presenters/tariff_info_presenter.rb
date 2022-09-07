# frozen_string_literal: true

# A tariff presenter
class TariffInfoPresenter < Presenter
  def as_json(*)
    { tariff: {
        id: @object[:tariff].id,
        name: @object[:tariff].name,
        started_at: @object[:tariff].started_at,
        ended_at: @object[:tariff].ended_at,
        kind: @object[:tariff].kind,
        duration_kind: @object[:tariff].duration_kind,
        advance_payment: @object[:tariff].advance_payment,
        settings: @object[:tariff].settings,
        extra: @object[:tariff].extra,
        service: @object[:tariff].service,
        nomenclatures: @object[:tariff].nomenclatures,
        opsms_attributes: @object[:tariff].opsms.map { |o| OpsmsPresenter.new(o) }
      }
    }
  end
end
