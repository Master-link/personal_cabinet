import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsTariffs = (dispatch, service) => {
  dispatch(
    setCombineRedux({
      active: '/services',
      data: [
        {
          name: (
            <FormattedMessage
              id="services"
              defaultMessage="Services"
            />
          ),
          to: `/services`,
        },
        {
          name: (
            <FormattedMessage
              id="service.name"
              defaultMessage="Service {service}"
              values={{ service: service.name }}
            />
          ),
          to: `/services/show/${service.id}`,
        },
        {
          name: (
            <FormattedMessage
              id="tariffs"
              defaultMessage="Tariffs"
            />
          ),
        },
      ],
    }),
  );
};
