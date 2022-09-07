# frozen_string_literal: true

# A resolution presenter
class ResolutionPresenter < Presenter
  def as_json(*)
    roles = @object[:resolution].roles.sort_by { |key| key["id"] }.map(&:name)
    {
      id: @object[:resolution].id,
      name: @object[:resolution].name,
      comment: @object[:resolution].comment,
      condition: @object[:resolution].condition,
      enabled: @object[:resolution].enabled,
      roles: roles,
      has_resolution: roles.include?(@object[:role])
    }
  end
end
