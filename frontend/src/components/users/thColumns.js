import { FormattedHTMLMessage } from 'react-intl';
import React from 'react';

export const thColumns = (data) => [
  { title: 'ID', value: data.id },
  {
    title: <FormattedHTMLMessage id="users.fio" defaultMessage="Full name" />,
    value: data.name,
  },
  {
    title: <FormattedHTMLMessage id="users.login" defaultMessage="Login" />,
    value: data.login,
  },
  {
    title: <FormattedHTMLMessage id="users.role" defaultMessage="Role" />,
    value: data.user_role,
  },
  {
    title: <FormattedHTMLMessage id="users.phone" defaultMessage="Phone" />,
    value: data.phone_number,
  },
  {
    title: 'Email',
    value: data.email,
  },
  {
    title: (
      <FormattedHTMLMessage
        id="users.connections"
        defaultMessage="Number of connections"
      />
    ),
    value: data.sign_in_count,
  },
];
