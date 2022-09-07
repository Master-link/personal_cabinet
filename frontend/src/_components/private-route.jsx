import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../_services/authentication.service';

const save_route_url = () => {
  localStorage.setItem(
    'last_page',
    window.location.pathname,
  );
};

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser =
        authenticationService.currentUserValue;
      if (
        !currentUser &&
        props.location.pathname !== '/reset' &&
        props.location.pathname !== '/set_password'
      ) {
        // not logged in so redirect to login page with the return url
        save_route_url();
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }

      save_route_url();
      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
