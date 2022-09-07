# frozen_string_literal: true

# Sms
# Отправка Email/sms для kind=calls_bot
# calls_bot так же как и sms_gate - подразумевает отправку 1 смс/емейла если баланс опустится ниже, указанной в уведомлении,
# для это происходит проверка по: баланс ниже чем в уведомлении И ```unless @alert_settings.first_send_at.present?```
# если баланс выше чем в уведомлении, @alert_settings.first_send_at устанавливаем в nil, чтобы больше не слать ничего
module AlertSettings
  module Checks
    class CallsBot < BaseMonitoring
    end
  end
end
