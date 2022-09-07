# frozen_string_literal: true

include ActionView::Helpers::TextHelper

class ClaimServicePresenter < Presenter
  def as_json(*)
    agreement = strip_tags(@object.agreement).try(:strip)
    is_link = false
    begin
      uri = URI.parse(agreement)
      is_link = true if uri.is_a?(URI::HTTP)
    rescue URI::InvalidURIError
    end

    {
      id: @object.id,
      name: @object.name,
      allow_subscribe: @object.ticket['allow_subscribe'],
      require_submit_client: @object.ticket['require_submit_client'],
      agreement: is_link ? agreement : @object.agreement,
      agreement_is_link: is_link
    }
  end
end
