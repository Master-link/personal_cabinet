import { GracePeriod } from '../gracePeriod/GracePeriod';
import { ThresholdBalance } from '../thresholdBalance/ThresholdBalance';
import { BeforeDays } from '../beforeDays/BeforeDays';
import * as PropTypes from 'prop-types';

export const DialogSelector = ({
  alert_type,
  email_enabled,
  setting: {
    grace_period,
    balance_limit,
    before_days,
    downtime_period,
  },
  sms_enabled,
  onCloseDialog,
  onSubmit,
}) => {
  switch (alert_type) {
    case 'monitoring_backup':
    case 'comes_expire_trigger':
      return (
        <BeforeDays
          onCloseDialog={onCloseDialog}
          onSubmit={(data) =>
            onSubmit({
              ...data,
              setting: {
                before_days: data.setting.before_days
                  .split(',')
                  .map(Number),
              },
            })
          }
          initialValues={{
            email_enabled,
            sms_enabled,
            setting: {
              before_days: before_days.join(','),
            },
          }}
        />
      );
    case 'balance_trigger_sms':
    case 'balance_trigger_voice_robot':
      return (
        <ThresholdBalance
          onCloseDialog={onCloseDialog}
          onSubmit={(data) =>
            onSubmit({
              ...data,
              setting: {
                balance_limit: parseInt(
                  data.setting.balance_limit,
                ),
              },
            })
          }
          initialValues={{
            email_enabled,
            sms_enabled,
            setting: {
              balance_limit,
            },
          }}
        />
      );
    case 'monitoring_smpp':
    case 'monitoring_tms':
      return (
        <GracePeriod
          onCloseDialog={onCloseDialog}
          onSubmit={(data) =>
            onSubmit({
              ...data,
              setting: {
                grace_period: parseInt(
                  data.setting.grace_period,
                ),
                downtime_period: parseInt(
                  data.setting.downtime_period,
                ),
              },
            })
          }
          initialValues={{
            email_enabled,
            sms_enabled,
            setting: {
              grace_period,
              downtime_period,
            },
          }}
        />
      );
    default:
      return <></>;
  }
};

DialogSelector.propTypes = {
  alert_type: PropTypes.string.isRequired,
  email_enabled: PropTypes.bool.isRequired,
  setting: PropTypes.shape({
    grace_period: PropTypes.number,
    balance_limit: PropTypes.number,
    before_days: PropTypes.arrayOf(PropTypes.number)
      .isRequired,
    downtime_period: PropTypes.number,
  }).isRequired,
  sms_enabled: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
