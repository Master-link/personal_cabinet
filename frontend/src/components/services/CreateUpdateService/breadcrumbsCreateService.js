import { FormattedMessage } from 'react-intl';
import { setCombineRedux } from 'src/redux/breadcrumbs/breadcrumbs.actions';
import React from 'react';

export const breadcrumbsCreateService = (dispatch) => {
  dispatch(
    setCombineRedux({
      active: '/services',
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
              id="services"
              defaultMessage="Services"
            />
          ),
          to: '/services',
        },
        {
          name: (
            <FormattedMessage
              id="creating_service"
              defaultMessage="Creating service"
            />
          ),
        },
      ],
    }),
  );
};
