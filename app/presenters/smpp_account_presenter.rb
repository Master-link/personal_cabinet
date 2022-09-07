# frozen_string_literal: true

class SmppAccountPresenter < Presenter
  def as_json(*)
    {
      id: @object[:id],
      name: "#{@object[:title]}(#{@object[:smpp_server]})"
    }
  end
end
