import React, { useState, useEffect } from 'react';
import Myspinner from '../share/myspinner.component';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getUser } from '../../services/user-http.service';
import { resetUserPassword } from '../../services/user-http.service';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl';
import { PermissionsUtility } from '../../utilities/permissions.utility';
import {
  CREATE_USER,
  MANAGE_USER,
} from '../../constants/permissions';
import { authenticationService } from '../../_services/authentication.service';
import decode from 'jwt-decode';
import { DeleteUser } from './DeleteUser.component';
import { useHistory } from 'react-router-dom';
import { thColumns } from './thColumns';
import * as PropTypes from 'prop-types';
import { RenderTableRow } from './RenderTableRow';
import { getClient } from '../../services/client-http.service';
import SnackbarUtils from '../../utilities/SnackbarUtils';
import { messageI18n } from '../../services/intl/intl';
import { breadcrumbsShowUserClient } from './breadcrumbsShowUserClient';
import { breadcrumbsShowUser } from './breadcrumbsShowUser';

const Show = ({ id, action, client_id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();

  const [client, setClient] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState([]);

  const fetchClient = async () => {
    try {
      const {
        data: { client },
      } = await getClient(client_id);
      setClient(client);
    } catch (e) {
      SnackbarUtils.error(
        messageI18n(
          'error_getting_data',
          'Error getting data',
        ),
      );
    } finally {
    }
  };

  const fetchData = async (id) => {
    try {
      setDisabled(false);
      const {
        data: { user },
      } = await getUser(id, client_id);
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(true);
    }
  };

  const loginAsUser = async () => {
    const user = await authenticationService.loginAsUser(
      id,
    );
    const userinfo = decode(user.token);
    if (
      userinfo.roles.includes('employee') ||
      userinfo.roles.includes('director')
    ) {
      await authenticationService.clientFetch(
        userinfo.user_id,
      );
    }
    history.push('/');
  };

  const resetPassword = () => {
    resetUserPassword(id)
      .then((response) => {
        enqueueSnackbar('Password has been reset', {
          variant: 'success',
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    fetchData(id);
    fetchClient();
  }, []);

  useEffect(() => {
    if (user && client) {
      if (action === 'users_show') {
        breadcrumbsShowUserClient(dispatch, user.name);
      } else {
        breadcrumbsShowUser(
          dispatch,
          client.name,
          client.crm.crm,
          client_id,
          user.id,
          user.name,
        );
      }
    }
  }, [user, client]);

  if (!disabled) {
    return <Myspinner />;
  }

  return (
    <>
      <div
        className="pt-1 pb-1 pl-3 pr-3 panel"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <>
          <div>
            {PermissionsUtility(CREATE_USER) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (action === 'users_show') {
                    history.push(
                      `/users_client/edit/${user.id}`,
                    );
                  } else {
                    history.push(
                      `/clients/show/${client_id}/users/edit/${user.id}`,
                    );
                  }
                }}
              >
                <FormattedMessage
                  id="users.edit"
                  defaultMessage="Editing User"
                />
              </Button>
            )}

            {PermissionsUtility(MANAGE_USER) && (
              <>
                <Button
                  className="ml-2"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    resetPassword();
                  }}
                >
                  <FormattedMessage
                    id="users.reset_password"
                    defaultMessage="Reset password"
                  />
                </Button>

                <DeleteUser
                  user_id={user.id}
                  user_name={user.name}
                  client_id={client_id}
                />
              </>
            )}
          </div>

          {PermissionsUtility(MANAGE_USER) && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                loginAsUser();
              }}
            >
              <FormattedMessage
                id="users.as_login"
                defaultMessage="Login as user"
              />
            </Button>
          )}
        </>
      </div>
      <table className="table resizable">
        <tbody>
          {thColumns(user).map((data, index) =>
            RenderTableRow(data, index),
          )}
        </tbody>
      </table>
    </>
  );
};

Show.propTypes = {
  id: PropTypes.number.isRequired,
  action: PropTypes.string.isRequired,
  client_id: PropTypes.number.isRequired,
};

export default Show;
