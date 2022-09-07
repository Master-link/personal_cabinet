# frozen_string_literal: true

# A ServiceBalancesPresenter presenter
class ServiceBalancesPresenter < Presenter
  def as_json(*)
    {
      balances: @object.map do |o|
        ServiceBalancePresenter.new(o)
      end
    }
  end
end
