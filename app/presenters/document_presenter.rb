# frozen_string_literal: true

# A Document presenter
class DocumentPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      document_type: @object.document_type,
      file_name: @object.file_name,
      price: @object.price,
      creation_datetime: @object.created_at,
      client: {
        id:  @object.client.id,
        name:  @object.client.name,
        crm:  @object.client.crm.crm
      },
      tariff: TariffIndexPresenter.new(@object.tariff)
    }
  end
end
