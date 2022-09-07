# frozen_string_literal: true

class CrmEmployeePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      crm: @object.crm,
      name: @object.name,
      category: @object.category
    }
  end
end
