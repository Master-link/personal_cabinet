# frozen_string_literal: true

# An PresentersAlertSetting
module PresentersAlertSetting
  # An AlertSettingsPresenter
  class AlertSettingsPresenter < ::Presenter
    def as_json(*)
      {
        data: @object[:alert_settings].map { |o| PresentersAlertSetting::AlertSettingPresenter.new(o) },
        meta: @object[:meta]
      }
    end
  end
end
