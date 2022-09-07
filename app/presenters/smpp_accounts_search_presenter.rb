# frozen_string_literal: true

class SmppAccountsSearchPresenter < Presenter
  def as_json(*)
    puts "%%%%% #{@object}"
    {
      data: @object[:smpp_accounts].map { |o| SmppAccountPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
