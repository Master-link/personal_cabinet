import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from '../../../redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsServices = (dispatch) => {
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
        },
      ],
    }),
  );
};
