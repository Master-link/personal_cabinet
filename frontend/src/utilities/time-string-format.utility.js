import { FormattedMessage } from 'react-intl';

const TimeStringFormat = ({ hours, minutes }) => (
  <span className="ml-2 bold">
    {hours}{' '}
    <FormattedMessage id="hours" defaultMessage="hours" />{' '}
    {minutes}{' '}
    <FormattedMessage
      id="minutes"
      defaultMessage="minutes"
    />
  </span>
);

export default TimeStringFormat;
