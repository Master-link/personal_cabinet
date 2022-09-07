import React, { useState, useEffect } from 'react';
import { authenticationService } from '../_services/authentication.service';
import LoginForm from './loginForm/LoginForm';
import Reset from './reset.component';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { useSnackbar } from 'notistack';
import {
  CLIENT,
  DIRECTOR,
  EMPLOYEE,
} from '../constants/roles';
import { useIntl } from 'react-intl';
import { setPostNotifications } from '../redux/notification/notification.actions';
import { setUserToken } from '../redux/user/user.actions';
import { connect } from 'react-redux';

const LoginPage = ({ setUserToken, ...props }) => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [authform, setAuthform] = useState(true);

  useEffect(() => {
    if (authenticationService.currentUserValue) {
      props.history.push('/');
    }
  }, []);

  const switchAuth = () => {
    setAuthform(!authform);
  };

  const posdData = async (values) => {
    const user = await authenticationService
      .login(values.email, values.password)
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: 'error',
        });
      });

    if (user !== undefined) {
      setUserToken(user.token);
      const userinfo = decode(user.token);
      if (
        userinfo.roles.includes(EMPLOYEE) ||
        userinfo.roles.includes(DIRECTOR) ||
        userinfo.roles.includes(CLIENT)
      ) {
        await authenticationService.clientFetch(
          userinfo.user_id,
        );
        return props.history.push('/');
      }

      if (localStorage.getItem('anotherUserId')) {
        props.history.push('/');
      }

      props.history.push(
        localStorage.getItem('last_page') || '/',
      );
    }
  };

  return (
    <div id="lp">
      <div className="container-fluid">
        <div className="row min-height-full">
          <header className="cabinet-block col-lg-3 order-lg-12">
            <div className="row min-height-full">
              <div className="col-12 container-aside ml-lg-0">
                <div className="logo">
                  {process.env.NODE_ENV ===
                  'development' ? (
                    <img
                      src="/img/logo-dev.png"
                      alt="projectK"
                      className="img-fluid"
                    />
                  ) : (
                    <img
                      src="/img/logo.png"
                      alt="projectK"
                      className="img-fluid"
                    />
                  )}
                </div>

                <div className="capH6 mb-4">
                  {intl.formatMessage({
                    id: 'login.lk',
                    defaultMessage:
                      '"Personal Account for Application',
                  })}
                </div>

                {authform ? (
                  <>
                    <div className="login-form">
                      <LoginForm onSubmit={posdData} />
                    </div>
                    <Link
                      to="#"
                      onClick={switchAuth}
                      className="restore-module__link_open restore-module__link text-small"
                    >
                      {intl.formatMessage({
                        id: 'login.forgot_password',
                        defaultMessage:
                          'Have you forgotten password ?',
                      })}
                    </Link>
                  </>
                ) : (
                  <>
                    <Reset
                      onSwitchLogin={switchAuth}
                      {...props}
                    />
                  </>
                )}

                <form className="restore-form">
                  <div className="row restore-module">
                    <div className="form-group col-lg-12 col-sm-4 order-lg-0 order-sm-1 order-0"></div>
                    <div
                      className="acc-restore col-12 restore-module__target d-none"
                      data-target="accRestore"
                    >
                      <div className="row">
                        <div className="form-group col-lg-12 col-sm-4">
                          <input
                            type="text"
                            className="form-control"
                            name="restore"
                            placeholder="Email или Логин"
                          />
                        </div>
                        <div className="form-group col-lg-12 col-sm-4">
                          <button
                            type="submit"
                            className="btn btn-secondary disabled"
                          >
                            {intl.formatMessage({
                              id: 'login.reset_password',
                              defaultMessage: '',
                            })}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form-group text-muted text-small col-lg-12 col-sm-8">
                      {intl.formatMessage({
                        id: 'login.lk_access',
                        defaultMessage: '',
                      })}
                    </div>
                  </div>
                </form>
              </div>

              <address className="col-12 d-none d-lg-block mt-lg-3 mb-lg-4 container-aside ml-0 align-self-end text-small">
                {intl.formatMessage({
                  id: 'login.name',
                  defaultMessage: '',
                })}
                <br />
                {intl.formatMessage({
                  id: 'login.address',
                  defaultMessage: '',
                })}
                <br />
                <b>
                  {intl.formatMessage({
                    id: 'login.phone',
                    defaultMessage: '',
                  })}
                  :
                </b>{' '}
                +7(111)111 11 11
                <br />
                <b>E-mail:</b>{' '}
                <a href="mailto:admin@application.ru">
                  admin@application.ru
                </a>
                <br />
                <b>
                  {intl.formatMessage({
                    id: 'login.inn',
                    defaultMessage: '',
                  })}
                </b>{' '}
                1111111111
                <br />
                <b>
                  {intl.formatMessage({
                    id: 'login.ogrn',
                    defaultMessage: '',
                  })}
                </b>{' '}
                1111111111111
              </address>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserToken: (token) => dispatch(setUserToken(token)),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
