import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsSmsLogins = (dispatch) =>
  dispatch(
    setCombineRedux({
      active: '/smslogins',
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
              id="sms.logins"
              defaultMessage="SMS logins"
            />
          ),
        },
      ],
    }),
  );
