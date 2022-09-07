# frozen_string_literal: true

# A SubscriptionTmPresenter presenter
class SubscriptionTmPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      hours: (@object.settings["hours"].to_i <= -60 || @object.settings["hours"].to_i>=60) ? (@object.settings["hours"].to_f / 60).to_i.to_s.rjust(2, '0') : 0,
      minutes: (@object.settings["hours"].to_i <= -60 || @object.settings["hours"].to_i>=60) ? (@object.settings["hours"].to_i.remainder(60)).abs().to_s.rjust(2, '0') : @object.settings["hours"].to_i,
      overtime_price: @object.settings["overtime_price"].to_i
    }
  end
end
