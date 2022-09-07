import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsProfiles = (
  dispatch,
  user_name,
) => {
  dispatch(
    setCombineRedux({
      active: '',
      data: [
        {
          name: (
            <FormattedMessage
              id="user"
              defaultMessage="User {user}"
              values={{ user: user_name }}
            />
          ),
        },
      ],
    }),
  );
};
