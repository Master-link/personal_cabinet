import { FormattedMessage } from 'react-intl';
import TimeStringFormat from 'src/utilities/time-string-format.utility';

const LeftTmSupport = ({ hours, minutes }) => (
  <div>
    <div>
      <FormattedMessage
        id="remains_time"
        defaultMessage="Remains time"
      />{' '}
      :
    </div>
    <div>
      <TimeStringFormat hours={hours} minutes={minutes} />
    </div>
  </div>
);

export default LeftTmSupport;
