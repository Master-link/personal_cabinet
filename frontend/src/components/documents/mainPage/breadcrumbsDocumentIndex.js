import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsDocumentsIndex = (
  dispatch,
  route,
) => {
  dispatch(setActive(route));
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
            id="documents"
            defaultMessage="Documents"
          />
        ),
      },
    ]),
  );
};
