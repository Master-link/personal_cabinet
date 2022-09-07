# frozen_string_literal: true

# A TransactionIndexPresenter presenter
class TransactionIndexPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      source: @object.source,
      client: {
        id: @object.client.id,
        crm: @object.client.crm ? @object.client.crm.crm : '',
        name: "#{@object.client.crm ? @object.client.crm.crm : ''} #{@object.client.name}"
      },
      created_at: @object.created_at,
      updated_at: @object.updated_at,
      money: @object.money,
      one_c_id: @object.one_c_id,
      detail: {
        ip: @object.detail["ip"],
        comment: @object.detail["comment"],
        count_sms: @object.detail["count_sms"],
        document_number: @object.detail["document_number"],
        payment_id: @object.detail["payment_id"],
        user_editor_id: @object.detail["user_editor_id"],
        period: @object.detail["period"],
        info: @object.detail["info"],
      },
      service: {
        name: @object.service.name,
        currency: {
          name: @object.service.currency.name,
          fmt: @object.service.currency.fmt,
          iso4217_code: @object.service.currency.iso4217_code
        },
      },
      user_name: @object.user&.name,
    }
  end
end
