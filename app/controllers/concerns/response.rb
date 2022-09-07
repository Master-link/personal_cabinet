# frozen_string_literal: true

# a response module
module Response
  def json_response(object = {}, status = :ok, _adapter = :json)
    render json: object, status: status, adapter: :json
  end
end
