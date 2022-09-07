# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  before_action :authorize_request
  before_action :essential_params

  attr_reader :current_user, :_request_ip

  def append_info_to_payload(payload)
    super
    payload[:host] = request.host
    payload[:remote_ip] = request.remote_ip
    payload[:ip] = request.ip
    payload[:user_id] = current_user.try(:id)
    payload[:parameters] = request.try(:parameters)
    payload[:accept] = request.headers[:accept]
    payload["Content-Type"] = request.headers["Content-Type"]
  end

  def mnp
    index_params
    relation = resource_repository
    models, total_count = index_resources(relation)
    options = {
      meta: {"count" => total_count},
      is_collection: true,
      links: false
    }
    json_response Oj.dump(JSONAPI::Serializer.serialize(models, options))
  end

  def render_bad_class
    render json: {message: "bad class"}, status: 422
  end

  private

  def current_ability
    @current_ability ||= Ability.new(current_user, params)
  end

  def essential_params
    @_request_ip = request.remote_ip || ""
  end

  def authorize_request
    @current_user ||= AuthorizeApiRequest.new(request.headers).call[:user]
  end

  def apply_filters(relation, params_filter)
    return relation if params_filter.nil? || params_filter.empty?

    params_filter = params_filter.to_unsafe_h

    filter_fields.each do |available_field|
      if available_field.is_a?(Hash)
        field_name = available_field.keys.first
        next unless params_filter.has_key?(field_name)

        filter_val = self.class.call_coercion(available_field[:type], params_filter[field_name])
        scope = available_field[field_name]

        relation = if scope.respond_to?(:call)
          scope.call(relation, filter_val)
        elsif scope.is_a?(Symbol)
          relation.public_send(scope, filter_val)
        end
      elsif available_field.is_a?(Symbol)
        if available_field == :crm_id && !params_filter[available_field].nil?
          filter_val = Crm.find_by(crm: params_filter[available_field])&.id
          relation = (filter_val.nil? ? Client.none : relation.public_send(:where, {available_field => filter_val}))
        elsif available_field == :service_id && !params_filter[available_field].nil?
          filter_val = params_filter[available_field]
          relation = relation.joins(:service).where(services: {id: filter_val})
        else
          filter_val = params_filter[available_field]
          relation = relation.public_send(:where, {available_field => filter_val}) unless filter_val.nil?
        end
      end
    end

    relation
  end

  def index_resources(relation)
    relation = apply_filters(relation, params.require(:filter)) if params[:filter].present?
    total_count = relation.count
    if params[:limit].present? && params[:page].present?
      relation = relation.paginate(per_page: params[:limit], page: params[:page])
    end

    [relation.all, total_count]
  end

  def self.call_coercion(type, value)
    return value if type.nil?

    type[value]
  rescue ArgumentError => e
    raise e.message
  end

  def index_params
  end
end
