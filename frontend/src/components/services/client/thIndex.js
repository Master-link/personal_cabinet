import { FormattedMessage } from 'react-intl';

export const thIndex = [
  {
    id: 'name',
    defaultMessage: 'Name',
    sort: 'services.name',
  },
  {
    id: 'balance',
    defaultMessage: 'Balance',
    style: { width: '300px' },
    sort: '',
  },
  {
    id: 'date_end_subscribe',
    defaultMessage: 'Expired the subscription',
    style: { width: '300px' },
    sort: '',
  },
  {
    id: 'subscribes',
    style: { width: '300px' },
    noFormat: true,
    defaultMessage: (
      <span
        className="center"
        style={{
          width: '100%',
          display: 'block',
        }}
      >
        <FormattedMessage
          id="subscribes"
          defaultMessage="Subscribes"
        />
        <br />
        <FormattedMessage
          id="total"
          defaultMessage="Total"
        />{' '}
        /
        <FormattedMessage
          id="active"
          defaultMessage="Active"
        />
      </span>
    ),
    sort: '',
  },
  {
    id: 'statistic.allowed',
    defaultMessage: 'Statistic allowed',
    style: { width: '300px' },
    sort: '',
  },
];
