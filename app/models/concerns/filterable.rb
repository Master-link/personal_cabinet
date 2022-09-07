module Filterable
  extend ActiveSupport::Concern
  include FiltersScope::ServiceFilterScope

  module ClassMethods
    def filterize(filtering_params, includes = [])
      results = self.includes(includes).where(nil)
      filtering_params.each do |key, value|
        results = results.public_send("filter_by_#{key}", value) if value.present?
      end
      results
    end
  end
end
