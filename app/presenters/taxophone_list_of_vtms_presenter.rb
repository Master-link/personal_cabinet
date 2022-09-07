# frozen_string_literal: true

# презентер таксофона
class TaxophoneListOfVtmsPresenter < Presenter
  def as_json(*)
    tvp = []
    @object[:data].each do |o|
      tvp << TaxophoneVtmPresenter.new(o["virtual_tm"]) if o["virtual_tm"]["enabled"]
    end

    {
        virtual_tms: tvp
    }
  end
end
