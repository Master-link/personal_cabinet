import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsAlerts = (
  dispatch,
  clientName,
  clientCrm,
  clientId,
) => {
  dispatch(
    setCombineRedux({
      active: '/',
      data: [
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
          name: `${clientName} ID ${clientCrm}`,
          to: `/clients/edit/${clientId}`,
        },
        {
          name: (
            <FormattedMessage
              id="notifications"
              defaultMessage="Notifications"
            />
          ),
        },
      ],
    }),
  );
};
