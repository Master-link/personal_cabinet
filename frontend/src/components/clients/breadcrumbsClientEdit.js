import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsClientEdit = (
  dispatch,
  clientName,
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
          name: (
            <FormattedMessage
              id="client.name"
              defaultMessage="Client {client}"
              values={{
                client: clientName,
              }}
            />
          ),
        },
      ],
    }),
  );
};
