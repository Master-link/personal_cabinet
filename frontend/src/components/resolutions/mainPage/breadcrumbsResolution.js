import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';

export const breadcrumbsResolution = (dispatch) => {
  dispatch(
    setCombineRedux({
      active: '',
      data: [
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
              id="resolutions"
              defaultMessage="Resolutions"
            />
          ),
        },
      ],
    }),
  );
};
