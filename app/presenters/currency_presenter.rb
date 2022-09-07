# frozen_string_literal: true

class CurrencyPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      symbol: @object.symbol,
      iso4217_code: @object.iso4217_code,
      iso4217_num: @object.iso4217_num
    }
  end
end
