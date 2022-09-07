import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CurrentUser } from '../utilities/current-user.utility';
import Header from '../components/header/header.component';
import Navbar from '../components/header/navbar.component';
import Footer from '../components/header/footer.component';
import { MainPageRoutes } from './MainPageRoutes';
import { NonAdminRoutes } from './NonAdminRoutes';
import { AdminRoutes } from './AdminRoutes';
import { CommonRoutes } from './CommonRoutes';
import { history } from '../_helpers/history';
import { routes_like_admin } from './routes-like-admin';
import '../components/share/bootsrap.style.scss';
import 'font-awesome/css/font-awesome.min.css';
import Myspinner from '../components/share/myspinner.component';
import { lazyLoad } from '../utilities/lazyLoad';
import ClosedRenewedMainPage from '../components/closed_renewed/ClosedRenewedMainPage/ClosedRenewedMainPage';

const LazyLoaderNotifications = lazyLoad(() =>
  import(
    '../components/notifications/NotificationsMainPage/LazyLoaderNotifications'
  ),
);

const NotFoundRedirect = () => <Redirect to="/404.html" />;

const HomePage = () => {
  const user = CurrentUser();
  const { client } =
    JSON.parse(localStorage.getItem('currentClient')) || {};

  useEffect(() => {
    if (process.env.MAINTANCE_DIRECTOR && client !== null) {
      history.push(`/maintance`);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div id="wrapper">
        <Header user={user} client={client} />
        <div id="mycontent-wrapper">
          <Switch>
            <Route
              path="/profile"
              component={CommonRoutes}
            />
            <Route
              path="/notifications"
              render={() => (
                <>
                  <Suspense fallback={<Myspinner />}>
                    <LazyLoaderNotifications />
                  </Suspense>
                </>
              )}
            />
            <Route
              path="/services"
              render={() =>
                routes_like_admin(user.role) ? (
                  <AdminRoutes />
                ) : (
                  <NotFoundRedirect />
                )
              }
            />
            <Route
              path="/clients"
              render={() =>
                routes_like_admin(user.role) ? (
                  <AdminRoutes />
                ) : (
                  <NotFoundRedirect />
                )
              }
            />
            <Route
              path="/transactions"
              render={() =>
                routes_like_admin(user.role) ? (
                  <AdminRoutes />
                ) : (
                  <NotFoundRedirect />
                )
              }
            />
            <Route
              path="/users"
              render={() =>
                routes_like_admin(user.role) ? (
                  <AdminRoutes />
                ) : (
                  <NotFoundRedirect />
                )
              }
            />
            <Route
              path="/documents"
              render={() => (
                <NonAdminRoutes client={client} />
              )}
            />
            <Route
              path="/smslogins"
              render={() =>
                routes_like_admin(user.role) ? (
                  <AdminRoutes />
                ) : (
                  <NotFoundRedirect />
                )
              }
            />
            <Route
              exact
              path="/claims"
              render={() =>
                routes_like_admin(user.role) ? (
                  <AdminRoutes />
                ) : (
                  <NotFoundRedirect />
                )
              }
            />

            <Route
              path="/claims/create"
              render={() => (
                <NonAdminRoutes client={client} />
              )}
            />
            <Route
              path="/users_client"
              render={() => (
                <NonAdminRoutes client={client} />
              )}
            />

            <Route
              path="/users_client/create"
              render={() => (
                <NonAdminRoutes client={client} />
              )}
            />
            <Route
              path="/users_client/edit/:id"
              render={() => (
                <NonAdminRoutes client={client} />
              )}
            />
            <Route
              path="/services_client"
              render={() => (
                <NonAdminRoutes client={client} />
              )}
            />
            <Route
              path="/taxophone_client"
              render={() => (
                <NonAdminRoutes client={client} />
              )}
            />
            <Route
              path="/transactions_client"
              render={() => (
                <NonAdminRoutes client={client} />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <MainPageRoutes role={user.role} />
              )}
            />

            <Route render={() => <NotFoundRedirect />} />
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
