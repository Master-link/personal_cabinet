# frozen_string_literal: true

module PresentersServiceBalance
  class BalancePresenter < Presenter
    def as_json(*)
      {
        id: @object[:id],
        balance: @object[:balance].to_f
      }
    end
  end
end
