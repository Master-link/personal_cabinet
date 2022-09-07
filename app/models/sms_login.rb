# frozen_string_literal: true

class SmsLogin
  include Anima.new(:id, :client_id, :login, :password, :smpp_address_uri)
end
