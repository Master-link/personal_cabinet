Rails.application.configure do
  config.lograge.formatter = Lograge::Formatters::Json.new
  config.lograge.enabled = true
  config.lograge.base_controller_class = ['ActionController::API']
  config.lograge.custom_options = lambda do |event|
    {
      request_time: Time.now,
      host: event.payload[:host],
      remote_ip: event.payload[:remote_ip],
      ip: event.payload[:ip],
      user_id: event.payload[:user_id],
      parameters: event.payload[:parameters],
      x_forwarded_for: event.payload[:x_forwarded_for],
      content_type: event.payload['Content-Type'],
      accept: event.payload[:accept]
    }.compact
  end
end
