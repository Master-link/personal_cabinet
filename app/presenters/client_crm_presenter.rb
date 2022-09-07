# frozen_string_literal: true

class ClientCrmPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      crm: @object.crm.present? ? @object.crm.crm : nil,
      name: "#{@object.crm.present? ? @object.crm.crm : ''} #{@object.name}"
    }
  end
end
