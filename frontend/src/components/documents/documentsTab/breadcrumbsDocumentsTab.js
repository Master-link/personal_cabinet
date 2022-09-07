import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from 'src/redux/breadcrumbs/breadcrumbs.actions';
import React from 'react';

export const breadcrumbsDocumentsTab = (
  dispatch,
  route,
  { id, name, crm: { crm } },
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
        to: route,
      },
      {
        name: (
          <FormattedMessage
            id="client.name"
            defaultMessage="Client {client}"
            values={{ client: `${name} ID ${crm}` }}
          />
        ),
        to: `/clients/edit/${id}`,
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
