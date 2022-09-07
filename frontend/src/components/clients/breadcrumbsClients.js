import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsClients = (dispatch) => {
  dispatch(
    setCombineRedux({
      active: '/',
      data: [
        {
          name: (
            <FormattedMessage
              id="clients"
              defaultMessage="Clients"
            />
          ),
        },
      ],
    }),
  );
};
