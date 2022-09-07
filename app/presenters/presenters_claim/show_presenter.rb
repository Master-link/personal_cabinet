# frozen_string_literal: true

# PresentersClaim
module PresentersClaim
  # ShowPresenter
  class ShowPresenter < Presenter
    def as_json(*)
      {
        client_id: @object[:claim][:client_id],
        comment: @object[:claim][:comment],
        date_activation: @object[:claim][:date_activation],
        id: @object[:claim][:id],
        service_id: @object[:claim][:service_id],
        state: @object[:claim][:state],
        tariff_id: @object[:claim][:tariff_id],
        service_option: {
          id: @object[:claim].service[:id],
          name: @object[:claim].service[:name]
        },
        tariff_option: {
          id: @object[:claim].tariff[:id],
          name: @object[:claim].tariff[:name]
        },
        service: ServicePresenter.new(@object[:claim].service),
        tariff: TariffSubscribePresenter.new(@object[:claim].tariff)
      }
    end
  end
end
