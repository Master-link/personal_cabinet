import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';
import React from 'react';

export const breadcrumbsCreateUser = (
  dispatch,
  clientName,
  clientCrm,
  clientId,
) => {
  dispatch(
    setCombineRedux({
      active: '/',
      data: [
        {
          name: (
            <FormattedMessage
              id="users"
              defaultMessage="Users"
            />
          ),
          to: '/users',
        },
        {
          name: (
            <FormattedMessage
              id="client.name"
              defaultMessage="Client {client}"
              values={{
                client: `${clientName} ID ${clientCrm}`,
              }}
            />
          ),
          to: `/clients/edit/${clientId}`,
        },
        {
          name: (
            <FormattedMessage
              id="users"
              defaultMessage="Users"
            />
          ),
          to: `/clients/show/${clientId}/users`,
        },
        {
          name: (
            <FormattedMessage
              id="users.create"
              defaultMessage="Creating an New user"
            />
          ),
        },
      ],
    }),
  );
};
