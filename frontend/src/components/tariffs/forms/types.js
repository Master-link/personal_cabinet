import { FormattedMessage } from 'react-intl';

export const types = [
  {
    id: '',
    title: (
      <FormattedMessage
        id="select_type"
        defaultMessage="Select type"
      />
    ),
  },
  {
    id: 'kind_periodic',
    title: (
      <FormattedMessage
        id="type.periodic"
        defaultMessage="Periodic"
      />
    ),
  },
  {
    id: 'kind_one_time',
    title: (
      <FormattedMessage
        id="type.one_time"
        defaultMessage="One time"
      />
    ),
  },
];
