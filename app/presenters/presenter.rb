# frozen_string_literal: true

class Presenter
  attr_reader :presenter_options

  def initialize(object, presenter_options = {})
    @presenter_options = presenter_options[:presenter_options] if presenter_options[:presenter_options].present?
    @object = object
  end

  def as_json
    raise 'as_json called on parent.'
  end
end
