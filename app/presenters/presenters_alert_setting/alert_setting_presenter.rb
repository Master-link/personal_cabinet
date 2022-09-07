# frozen_string_literal: true

# An PresentersAlertSetting
module PresentersAlertSetting
  # An AlertSettingPresenter
  class AlertSettingPresenter < Presenter
    def as_json(*)
      {
        id: @object.id,
        name: I18n.t(@object.name),
        alert_type: @object.alert_type,
        email_enabled: @object.email_enabled,
        sms_enabled: @object.sms_enabled,
        state: @object.state,
        setting: @object.setting
      }
    end
  end
end
