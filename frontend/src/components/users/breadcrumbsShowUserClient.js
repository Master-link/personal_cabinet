import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsShowUserClient = (
  dispatch,
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
        { name: `${userName}` },
      ],
    }),
  );
};
