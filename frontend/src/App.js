import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './_home-page/home-page.component';
import { PrivateRoute } from './_components/private-route';
import LoginPage from './_login-page/login-page.component';
import MaintancePage from './pages/maintance.page';
import Reset from './_login-page/reset.component';
import SetPassword from './_login-page/setPassword/set-password.component';
import { authenticationService } from './_services/authentication.service';
import { useSnackbar } from 'notistack';
import { IntlProvider } from 'react-intl';
import messages_en from '../src/translations/en.json';
import messages_ru from '../src/translations/ru.json';
import { Forbidden } from './_components/forbidden';
import SnackbarUtils from './utilities/SnackbarUtils';
import { NotFoundPage } from './components/SystemComponents/NotFoundPage';
import { Redirect } from 'react-router-dom';
import { ActionCableProvider } from 'actioncable-client-react';
import { ShowPdfAsHtml } from './components/documents/ShowPdfAsHtml.component';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import LkSocketMessage from './components/SocketMessage/LkSocketMessage';

const messages = {
  en: messages_en,
  ru: messages_ru,
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#343a40',
    },
    success: {
      main: '#037c1d',
    },
    warning: {
      main: '#ff1010',
    },
  },
});

const App = ({ lang, token, ...props }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserToken, setCurrentUserToken] =
    useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const socketUri = process.env.REACT_APP_SOCKET;
  const currentToken = localStorage.getItem('currentToken');

  useEffect(() => {
    SnackbarUtils.setSnackBar(
      enqueueSnackbar,
      closeSnackbar,
    );
    authenticationService.currentUser.subscribe((user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser) setCurrentUserToken(currentUser.token);
  }, [currentUser]);

  const language =
    localStorage.getItem('lang') ||
    navigator.language.split(/[-_]/)[0];

  return (
    <IntlProvider
      locale={language}
      messages={messages[language]}
    >
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route
            path="/404.html"
            component={NotFoundPage}
          />
          <Route path="/reset" component={Reset} />
          <Route path="/forbidden" component={Forbidden} />
          <Route
            path="/set_password"
            component={SetPassword}
            {...props}
          />
          <Route
            path="/login"
            component={LoginPage}
            {...props}
          />
          <Route
            path="/maintance"
            component={MaintancePage}
            {...props}
          />

          <ActionCableProvider
            key={token}
            url={`${socketUri}/lkcable?userToken=${token}`}
          >
            {token && <LkSocketMessage />}
            <PrivateRoute
              path="/notifications"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/reports"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/edit/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services/:action"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services/:action/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services/show/:service_id/tariffs"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services/show/:service_id/tariffs/create"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services/show/:service_id/tariffs/show/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services/show/:service_id/tariffs/edit/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services_client"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/transactions_client"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/users_client"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/users_client/show/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services_client/:action/:service_id/:subaction"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/services_client/:action/:service_id/:subcontroller/:subaction/:subscription_id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/services"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/transactions"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/documents"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/users"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/alerts"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/monitorings"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/services/show/0/subscriptions/create/new/for_client"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/services/:action/:service_id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/services/:action/:service_id/:subaction"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/services/:action/:service_id/smsconsumptions/:subaction/:subscription_id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/services/:action/:service_id/subscriptions/:subaction/:subscription_id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/services/:action/:service_id/payment_gate/:subaction/:subscription_id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/transactions/:action/:transaction_id"
              component={HomePage}
            />

            <PrivateRoute
              exact
              path="/clients/show/:client_id/:controller/:action"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/clients/show/:client_id/:controller/:action/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/transactions"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/transactions/:action"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/transactions/:action/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/users"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/users/create"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/users_client/create"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/users_client/edit/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/users/show/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/users/edit/:id"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/documents"
              component={HomePage}
            />
            <PrivateRoute
              path="/documents/:action"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/smslogins"
              component={HomePage}
            />
            <PrivateRoute
              path="/claims"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/profile"
              component={HomePage}
            />
            <PrivateRoute
              exact
              path="/print/document/pdf/:client_id/documents/:id"
              component={ShowPdfAsHtml}
            />
            <PrivateRoute
              exact
              path="/admin_dashboard"
              component={HomePage}
            />
          </ActionCableProvider>
          <Route render={() => <NotFoundRedirect />} />
        </Switch>
      </MuiThemeProvider>
    </IntlProvider>
  );
};

const NotFoundRedirect = () => <Redirect to="/404.html" />;

const mapStateToProps = (state) => {
  return {
    lang: state.lang.data,
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(
  withStyles({ withTheme: true })(App),
);
