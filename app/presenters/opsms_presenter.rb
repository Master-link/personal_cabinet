# frozen_string_literal: true

# A tariff presenter
class OpsmsPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      limit: @object.limit,
      price: @object.price,
      operator_id: @object.operator.id,
      operator_name: @object.operator.title
    }
  end
end
