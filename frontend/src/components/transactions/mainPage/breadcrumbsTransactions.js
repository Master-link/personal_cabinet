import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsTransactions = (
  dispatch,
  isSecondRole,
) => {
  if (isSecondRole) {
    dispatch(setActive('/transactions_client'));
  } else {
    dispatch(setActive('/transactions'));
  }

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
            id="transactions"
            defaultMessage="Transactions"
          />
        ),
      },
    ]),
  );
};
