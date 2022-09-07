# frozen_string_literal: true

# Subscription::DefaultSmsSubscriptionPresenter
class Subscription
  class DefaultSmsSubscriptionPresenter < Presenter
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
          tariff: build_tariff,
          opsms_attributes: @object[:subscription].opsms
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
                     'subscribe_price',
                     'comment',
                     'renewal',
                     'monthly_fee',
                     'sms_login'
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
      when STATE_ACTIVE, STATE_LIMITED, STATE_SUSPEND, STATE_CLOSED, STATE_RENEWAL
        %i[
          service_id
          tariff_id
          started_at
          ended_at
        ]
      end
    end
  end
end
