import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsCreate = (dispatch) => {
  dispatch(setActive('/services_client'));
  dispatch(
    setBreadcrumb([
      {
        name: (
          <FormattedMessage
            id="main"
            defaultMessage="Main page"
          />
        ),
        to: '/',
      },
      {
        name: (
          <FormattedMessage
            id="services"
            defaultMessage="Services"
          />
        ),
        to: '/services_client',
      },
      {
        name: (
          <FormattedMessage
            id="claims.creating"
            defaultMessage="Creating a new claim"
          />
        ),
      },
    ]),
  );
};
