require 'sneakers'
require 'sneakers/handlers/maxretry'

begin
  Sneakers.configure  heartbeat: 30,
                    amqp: 'amqp://guest:tseug@localhost:5672',
                    vhost: '/',
                    exchange: :errors,
                    exchange_type: :topic,
                    durable: true,
                    ack: true,
                    auto_delete: false
                    
  #Sneakers.logger.level = Logger::DEBUG
rescue Exception => e
  puts "Something bad happend"
end