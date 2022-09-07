# frozen_string_literal: true

# A Tariff index presenter
class TariffsIndexPresenter < Presenter
  def as_json(*)
    {
      tariffs: @object[:tariffs].map { |o| TariffIndexPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
