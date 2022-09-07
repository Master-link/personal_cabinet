import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from '../../../../src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsClosedRenewedMainPage = (
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
            id="dashboard"
            defaultMessage="Dashboard"
          />
        ),
        to: '/admin_dashboard',
      },
      {
        name: (
          <FormattedMessage
            id="closed_renewed"
            defaultMessage="Closed and renewed subscriptions"
          />
        ),
      },
    ]),
  );
};
