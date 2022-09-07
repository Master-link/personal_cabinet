import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsCreateUserClient = (dispatch) => {
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
