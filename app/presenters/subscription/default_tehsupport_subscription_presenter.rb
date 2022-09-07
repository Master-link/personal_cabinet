# frozen_string_literal: true

# Subscription::DefaultTehsupportSubscriptionPresenter
class Subscription
  class DefaultTehsupportSubscriptionPresenter < Presenter
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
          tariff: build_tariff
        },
        meta: {
          read_only: build_read_only
        }
      }
    end

    private

    def build_jsondata
      new_object = @object[:subscription]
                   .jsondata
                   .slice(
                     'auto_send_bill',
                     'new_tariff_hours',
                     'new_tariff_slas',
                     'new_tariff',
                     'subscribe_price',
                     'comment',
                     'renewal'
                   )
      new_object.except('comment') unless @object[:current_user].primary_roles?
      new_object
    end

    def build_tariff
      new_object = @object[:subscription].tariff.slice(
        'advance_payment',
        'duration_kind',
        'id',
        'kind',
        'name',
        'extra',
        'settings'
      )
      new_object['service'] = @object[:subscription].tariff.service.slice('id', 'name', 'ticket')
      new_object
    end

    def build_read_only
      case @object[:subscription].state.to_sym
      when STATE_NEW
        %i[service_id
           tariff_id]
      when STATE_ACTIVE, STATE_LIMITED, STATE_SUSPEND, STATE_RENEWAL
        [
          :service_id,
          :tariff_id,
          :started_at,
          :ended_at,
          'jsondata.subscribe_price',
          'jsondata.new_tariff_hours',
          'jsondata.new_tariff_slas'
        ]
      when STATE_CLOSED
        %i[
          service_id
          tariff_id
          started_at
          ended_at
          credit_limit
          jsondata.subscribe_price
          jsondata.renewal
          jsondata.comment
          jsondata.subscribe_price
          jsondata.new_tariff_hours
          jsondata.new_tariff_slas
        ]
      end
    end
  end
end
