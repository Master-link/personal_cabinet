# resolutions presenter
class ResolutionsPresenter < Presenter
  def as_json(*)
    {
      data: @object[:resolutions].map { |o| ResolutionPresenter.new({resolution: o, role: @object[:role]}) },
      meta: @object[:meta]
    }
  end
end
