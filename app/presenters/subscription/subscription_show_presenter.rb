# frozen_string_literal: true

# A SubscriptionShowPresenter presenter
class Subscription
  class SubscriptionShowPresenter < Presenter
    def as_json(*)
      {
        subscription: {
          id: @object[:subscription].id,
          client_id: @object[:subscription].client_id,
          tariff_id: @object[:subscription].tariff_id,
          credit_limit: @object[:subscription].credit_limit,
          state: @object[:subscription].state,
          jsondata: build_jsondata,
          settings: @object[:subscription].settings,
          started_at: @object[:subscription].started_at,
          ended_at: @object[:subscription].ended_at,
          created_at: @object[:subscription].created_at,
          updated_at: @object[:subscription].updated_at,
          client: @object[:subscription].client,
          tariff: Tariff::TariffDetailPresenter.new(@object[:subscription].tariff),
          opsms_attributes: @object[:subscription].opsms
        },
        meta: {
          read_only: [:service_id]
        }
      }
    end

    private

    def build_jsondata
      if @object[:current_user].primary_roles?
        @object[:subscription].jsondata
      else
        @object[:subscription].jsondata.reject do |k, _v|
          k == 'comment'
        end
      end
    end
  end
end
