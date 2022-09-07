# frozen_string_literal: true

class ServicePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      currency: {
        name: @object.currency.name,
        unicode_code: @object.currency.unicode_code,
        decimal_code: @object.currency.decimal_code,
        hexadecimal_code: @object.currency.hexadecimal_code,
        iso4217_code: @object.currency.iso4217_code,
        fmt: @object.currency.fmt
      }
    }
  end
end
