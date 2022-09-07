import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from '../../../../src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsChangeTariff = (dispatch) => {
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
            id="change_tariff_stat"
            defaultMessage="Change tariff statistics"
          />
        ),
      },
    ]),
  );
};
