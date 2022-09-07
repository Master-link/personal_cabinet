require_relative 'initializers/load_config'

class TimestampedBasic < ::Logging::Layouts::Basic
  def format(event)
    ActiveSupport::Logger::Formatter
    obj = format_obj(event.data)
    sprintf(
      "%s %*s %s##{Process.pid} [#{Logging.mdc['request_id']}] %s\n",
      Time.now.iso8601,
      ::Logging::MAX_LEVEL_LENGTH,
      ::Logging::LNAMES[event.level],
      event.logger,
      clean(obj)
    )
  end

  private

  def clean(message)
    message = message.to_s.strip
    message.gsub!(/\e\[[0-9;]*m/, '') # remove useless ansi color codes
    message
  end
end

Logging::Rails.configure do |config|

  Logging.init %w[debug info warn error fatal]

  Logging.format_as :inspect

  layout = Logging.layouts.pattern(
    pattern: '%.1l, [%d #%p] %5l -- %c: %m\n',
    date_pattern: '%FT%T.%L'
  )

  Logging.color_scheme(
    'bright',
    levels: {
      info: :green,
      warn: :yellow,
      error: :red,
      fatal: [:white, :on_red]
    },
    date: :blue,
    logger: :cyan,
    message: :magenta
  )

  Logging.appenders.stdout(
    'stdout',
    auto_flushing: true,
    layout: Logging.layouts.pattern(
      pattern: '%.1l, [%d #%p] %5l -- %c: %m\n',
      date_pattern: '%FT%T.%L',
      color_scheme: 'bright'
    )
  ) if config.log_to.include? 'stdout'

  Logging.appenders.rolling_file(
    'file',
    filename: config.paths['log'].first,
    keep: 7,
    age: 'daily',
    truncate: false,
    auto_flushing: true,
    layout: layout
  ) if config.log_to.include? 'file'

  Logging.logger.root.level = config.log_level
  Logging.logger.root.appenders = config.log_to unless config.log_to.empty?

  if (syslog_name = APP_CONFIG['syslog_name']).present?
    syslog_level = (APP_CONFIG['syslog_level'].to_s.downcase || 'info').to_sym
    options = {level: syslog_level, layout: TimestampedBasic.new}
    syslog_appender = Logging.appenders.syslog(syslog_name, options)
    Logging.logger.root.add_appenders syslog_appender
  end
end
