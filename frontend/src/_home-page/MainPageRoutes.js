import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import * as PropTypes from 'prop-types';
import ClientsPage from '../pages/clients-page.page';
import AboutCompanyPage from '../pages/about-company.page';
import { routes_director_employee } from './routes-director-employee';
import { routes_like_admin } from './routes-like-admin';

export const MainPageRoutes = ({
  role,
}) => (
  <Switch>
    {routes_like_admin(role) && (
      <Route
        exact
        path="/"
        component={ClientsPage}
      />
    )}
    {routes_director_employee(role) && (
      <Route
        exact
        path="/"
        component={AboutCompanyPage}
      />
    )}
  </Switch>
);

MainPageRoutes.propTypes = {
  role: PropTypes.string.isRequired,
};
