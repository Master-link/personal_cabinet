import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from '../../../../src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsNotificationMainPage = (
  dispatch,
) => {
  dispatch(setActive('/profile'));
  dispatch(
    setBreadcrumb([
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
            id="notifications"
            defaultMessage="Notifications"
          />
        ),
      },
    ]),
  );
};
