# расширение модели Client
# взят со старого исходника
# нужен при работе с платформой для получения настроек мониторинга
module ClientWithTms
  extend ActiveSupport::Concern

  def tm_servers=(value)
    @tm_servers = value
  end

  def tm_servers
    @tm_servers.map { |tms| TmServer.new(tms['tm_server']) }
  end

  def tm_addresses(enabled: true)
    tm_servers.reduce([]) { |memo, tms| memo + tms.tm_addresses(enabled: enabled) }
  end
end
