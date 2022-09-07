import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';
import React from 'react';

export const breadcrumbsCreateUserEdit = (
  dispatch,
  clientName,
  clientCrm,
  clientId,
  userId,
  userName,
) => {
  dispatch(
    setCombineRedux({
      active: '/',
      data: [
        {
          name: (
            <FormattedMessage
              id="main"
              defaultMessage="Main page"
            />
          ),
          to: '/',
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
          name: userName,
          to: `/clients/show/${clientId}/users/show/${userId}`,
        },
        {
          name: (
            <FormattedMessage
              id="users.edit"
              defaultMessage="Editing an New user"
            />
          ),
        },
      ],
    }),
  );
};
