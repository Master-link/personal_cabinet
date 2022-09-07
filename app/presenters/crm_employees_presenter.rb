# frozen_string_literal: true

# A CrmEmployeesPresenter index presenter
class CrmEmployeesPresenter < Presenter
  def as_json(*)
    {
      data: @object[:data].map { |o| CrmEmployeePresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
