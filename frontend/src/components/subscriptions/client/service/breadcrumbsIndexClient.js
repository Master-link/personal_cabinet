import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from '../../../../redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsIndexClient = (
  dispatch,
  clientId,
  clientName,
  clientCrm,
  serviceName,
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
          name: <FormattedMessage id="services" />,
          to: `/clients/show/${clientId}/services`,
        },
        {
          name: (
            <FormattedMessage
              id="service.subscribes"
              defaultMessage="Subscriptions for {services}"
              values={{ services: `${serviceName}` }}
            />
          ),
        },
      ],
    }),
  );
};
