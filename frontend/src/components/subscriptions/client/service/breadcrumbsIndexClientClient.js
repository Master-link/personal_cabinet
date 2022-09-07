import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from '../../../../redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsIndexClientClient = (
  dispatch,
  serviceName,
) => {
  dispatch(
    setCombineRedux({
      active: 'services_client',
      data: [
        {
          name: (
            <FormattedMessage
              id="services"
              defaultMessage="services"
            />
          ),
          to: '/services_client',
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
