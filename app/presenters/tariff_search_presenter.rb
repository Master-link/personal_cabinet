# frozen_string_literal: true

# A TAriffSearch presenter
class TariffSearchPresenter < Presenter
  def as_json(*)
    {
      data: @object[:tariffs].map { |o| TariffSubscribePresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
