import { FormattedMessage } from 'react-intl';

export const stateOptions = [
  {
    id: 'state_active',
    name: (
      <FormattedMessage
        id="active"
        defaultMessage="Active"
      />
    ),
  },
  {
    id: 'state_closed',
    name: (
      <FormattedMessage
        id="closed"
        defaultMessage="Closed"
      />
    ),
  },
  {
    id: 'state_new',
    name: (
      <FormattedMessage id="new" defaultMessage="New" />
    ),
  },
  {
    id: 'state_limited',
    name: (
      <FormattedMessage
        id="limited"
        defaultMessage="Limited"
      />
    ),
  },
  {
    id: 'state_suspend',
    name: (
      <FormattedMessage
        id="suspended"
        defaultMessage="Suspended"
      />
    ),
  },
  {
    id: 'no_subscribes',
    name: (
      <FormattedMessage
        id="no_subscribes"
        defaultMessage="No subscribes"
      />
    ),
  },
];
