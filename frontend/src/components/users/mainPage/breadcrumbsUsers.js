import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from '../../../redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsUsers = (dispatch) => {
  dispatch(
    setCombineRedux({
      active: '/users',
      data: [
        {
          name: (
            <FormattedMessage
              id="main"
              defaultMessage="Main"
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
        },
      ],
    }),
  );
};
