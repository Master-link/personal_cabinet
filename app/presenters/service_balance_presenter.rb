# frozen_string_literal: true

# A ServiceBalancePresenter presenter
class ServiceBalancePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      balance: @object.balance.to_f,
      service_id: @object.service.id,
      service_name: @object.service.name,
      balance_name: @object.service.currency.name,
      unicode_code: @object.service.currency.unicode_code,
      decimal_code: @object.service.currency.decimal_code,
      hexadecimal_code: @object.service.currency.hexadecimal_code,
      iso4217_code: @object.service.currency.iso4217_code,
      fmt: @object.service.currency.fmt
    }
  end
end
