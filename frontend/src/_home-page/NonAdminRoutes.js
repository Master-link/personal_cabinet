import { Route, Switch } from 'react-router-dom';
import SubscriptionsClientTabs from '../components/subscriptions/subscriptions-client-tabs.component';
import Tabs from '../components/clients/tabs.component';
import ServicesPage from '../pages/services-page.page';
import TransactionsPage from '../pages/transactions-page.page';
import UsersClientPage from '../pages/users-client.page';
import React from 'react';
import * as PropTypes from 'prop-types';
import { NotFoundPage } from '../components/SystemComponents/NotFoundPage';
import ClaimsFormContainer from 'src/components/claims/Forms/ClaimsForm.container';
import DocumentAdapter from '../components/documents/mainPage/DocumentAdapter';
import CreateUserClientContainer from '../components/users/createUser/CreateUserClient.container';

export const NonAdminRoutes = ({ client }) => (
  <Switch>
    <Route
      exact
      path="/services_client/show/:id/:subcontroller"
      render={(props) => (
        <SubscriptionsClientTabs
          {...props}
          action="services_index_client"
          subaction="services_index_client"
          client_id={client.id}
        />
      )}
    />

    <Route
      path="/claims/create"
      render={() => (
        <ClaimsFormContainer clientId={client.id} />
      )}
    />

    <Route
      exact
      path="/services_client/:action/:id/:subcontroller/:subaction/:subaction_id"
      render={(props) => (
        <SubscriptionsClientTabs
          {...props}
          action="services_client"
          subaction="services_client"
          client_id={client.id}
        />
      )}
    />

    <Route
      exact
      path="/services_client/show/:client_id/:controller/:action"
      component={Tabs}
    />

    <Route
      exact
      path="/services_client"
      render={(props) => (
        <ServicesPage
          {...props}
          action="services_index_client"
          client_id={client.id}
        />
      )}
    />

    <Route
      exact
      path="/transactions_client"
      render={(props) => (
        <TransactionsPage
          {...props}
          action="transactions_client"
          client_id={client.id}
        />
      )}
    />

    <Route
      exact
      path="/documents"
      render={() => (
        <DocumentAdapter client_id={client?.id} />
      )}
    />

    <Route
      exact
      path="/users_client"
      render={(props) => (
        <UsersClientPage
          {...props}
          action="users_client"
          client_id={client.id}
        />
      )}
    />

    <Route
      exact
      path="/users_client/create"
      render={() => (
        <CreateUserClientContainer clientId={client.id} />
      )}
    />

    <Route
      exact
      path="/users_client/edit/:id"
      render={({
        match: {
          params: { id },
        },
      }) => (
        <CreateUserClientContainer
          clientId={client.id}
          id={id}
        />
      )}
    />

    <Route
      exact
      path="/users_client/show/:id"
      render={(props) => (
        <UsersClientPage
          {...props}
          action="users_show"
          client_id={client.id}
        />
      )}
    />

    <Route component={NotFoundPage} />
  </Switch>
);

NonAdminRoutes.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
