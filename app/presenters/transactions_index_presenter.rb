# frozen_string_literal: true

# A Transaction index presenter
class TransactionsIndexPresenter < Presenter
  def as_json(*)
    {
      data: @object[:data].map { |o| TransactionIndexPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
