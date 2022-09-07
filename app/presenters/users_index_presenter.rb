class UsersIndexPresenter < Presenter
  def as_json(*)
    {
      users: @object[:users].map { |o| UserPresenter.new(o) },
      meta: @object[:meta]
    }
  end
end
