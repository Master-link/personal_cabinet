import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsUserEdit = (dispatch, userName) => {
  dispatch(
    setCombineRedux({
      active: '/users',
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
          name: userName,
        },
      ],
    }),
  );
};
