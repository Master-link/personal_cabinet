import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from '../../../redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsUsers = (
  dispatch,
  clientId,
  action,
) => {
  if (action === 'users_client') {
    dispatch(
      setCombineRedux({
        active: '/users_client',
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
                id="users"
                defaultMessage="Users"
              />
            ),
            to: `/clients/show/${clientId}/users`,
          },
        ],
      }),
    );
  } else {
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
                id="client"
                defaultMessage="Client"
              />
            ),
            to: `/clients/edit/${clientId}`,
          },
          {
            name: (
              <FormattedMessage
                id="users.edit"
                defaultMessage="Editing User"
              />
            ),
          },
        ],
      }),
    );
  }
};
