import { Route, Switch } from 'react-router-dom';
import Tabs from '../components/clients/tabs.component';
import ServicesPage from '../pages/services-page.page';
import TransactionsPage from '../pages/transactions-page.page';
import TariffsPage from '../pages/tariffs-page.page';
import Clients from '../components/clients/clients.component';
import SubscriptionForClient from '../components/subscriptions/client/service/subscription-for-client.component';
import Users from '../components/users/users.component';
import UsersPage from '../pages/users-page.page';
import { ClaimsAdminPage } from 'src/components/claims/index';
import SmsLogins from '../components/smslogins/SmsLogins.component';
import CreateUserContainer from '../components/users/createUser/CreateUser.container';
import Show from '../components/users/show.component';

export const AdminRoutes = () => (
  <Switch>
    <Route
      exact
      path="/services/:action/:id"
      component={ServicesPage}
    />
    <Route
      exact
      path="/services/show/:service_id/tariffs"
      render={(props) => (
        <TariffsPage
          action="index-for-services"
          {...props}
        />
      )}
    />
    <Route
      exact
      path="/services/show/:service_id/tariffs/create"
      render={(props) => (
        <TariffsPage
          action="create-for-services"
          {...props}
        />
      )}
    />
    <Route
      exact
      path="/services/show/:service_id/tariffs/edit/:id"
      render={(props) => (
        <TariffsPage
          action="edit-for-services"
          {...props}
        />
      )}
    />
    <Route
      exact
      path="/clients/show/:client_id/:controller"
      component={Tabs}
    />
    <Route
      exact
      path="/clients/:action/:client_id"
      component={Clients}
    />
    <Route
      exact
      path="/clients/show/:client_id/users/show/:id"
      render={({
        match: {
          params: { client_id, id },
        },
      }) => <Show client_id={client_id} id={id} />}
    />

    <Route
      exact
      path="/clients/show/:client_id/users/edit/:id"
      render={({
        match: {
          params: { client_id, id },
        },
      }) => (
        <CreateUserContainer clientId={client_id} id={id} />
      )}
    />

    <Route
      exact
      path="/clients/show/:client_id/services/show/0/subscriptions/create/new/for_client"
      component={SubscriptionForClient}
    />
    <Route
      exact
      path="/clients/show/:client_id/:controller/:action/:id"
      component={Tabs}
    />
    <Route
      exact
      path="/clients/show/:client_id/:controller/:action/:id/:subcontroller"
      component={Tabs}
    />
    <Route
      exact
      path="/clients/show/:client_id/:controller/:action/:id/:subcontroller/:subaction/:subaction_id"
      component={Tabs}
    />

    <Route
      exact
      path="/clients/show/:client_id/users/create"
      render={({
        match: {
          params: { client_id },
        },
      }) => <CreateUserContainer clientId={client_id} />}
    />

    <Route
      exact
      path="/clients/show/:client_id/:controller/:action"
      component={Tabs}
    />
    <Route
      exact
      path="/transactions"
      render={(props) => (
        <TransactionsPage {...props} action="index" />
      )}
    />
    <Route
      exact
      path="/transactions/:action"
      render={(props) => (
        <TransactionsPage {...props} action="create" />
      )}
    />
    <Route
      exact
      path="/transactions/:action/:id"
      component={TransactionsPage}
    />
    <Route
      exact
      path="/users/edit/:id"
      render={({
        match: {
          params: { id },
        },
      }) => <CreateUserContainer id={id} />}
    />

    <Route
      exact
      path="/users"
      render={(props) => (
        <Users {...props} action="index" />
      )}
    />
    <Route
      exact
      path="/users/create"
      render={() => <CreateUserContainer />}
    />
    <Route
      exact
      path="/users/:action"
      component={UsersPage}
    />
    <Route
      exact
      path="/users/:action/:id"
      component={UsersPage}
    />
    <Route exact path="/smslogins" component={SmsLogins} />
    <Route
      exact
      path="/claims"
      component={ClaimsAdminPage}
    />
    <Route
      exact
      path="/services"
      component={ServicesPage}
    />
    <Route
      exact
      path="/services/:action"
      component={ServicesPage}
    />
  </Switch>
);
