import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsCreateUserClientEdit = (
  dispatch,
  userId,
  userName,
) => {
  dispatch(
    setCombineRedux({
      active: '/users_client',
      data: [
        {
          name: (
            <FormattedMessage
              id="users"
              defaultMessage="Users"
            />
          ),
          to: '/users_client',
        },
        {
          name: userName,
          to: `/users_client/show/${userId}`,
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
