import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Myspinner from '../../share/myspinner.component';
import {
  getUser,
  postCreateUser,
  putUser,
} from '../../../services/user-http.service';
import { CreateUser } from './CreateUser';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { roles } from '../roles';
import { validate } from './validate';
import { validateEdit } from './validateEdit';
import { breadcrumbsCreateUser } from './breadcrumbsCreateUser';
import { getClient } from '../../../services/client-http.service';
import SnackbarUtils from '../../../utilities/SnackbarUtils';
import { messageI18n } from '../../../services/intl/intl';
import { breadcrumbsCreateUserEdit } from './breadcrumbsCreateUserEdit';
import { breadcrumbsUserEdit } from './breadcrumbsUserEdit';
import * as PropTypes from 'prop-types';

const errorBuilder = ({
  response: {
    data: { message },
  },
}) => message.result || message;

const extractRole = (role) => {
  const roles = role.split(',');
  return roles[0];
};

const CreateUserContainer = ({ clientId, id }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [loaded, setLoaded] = useState(true);
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const fetchClient = async () => {
    try {
      const {
        data: { client },
      } = await getClient(clientId);
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

  const fetchUser = async () => {
    try {
      setLoaded(false);
      const {
        data: { user },
      } = await getUser(id, clientId);
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const detectRedirect = () => {
    if (clientId) {
      return history.push(
        `/clients/show/${clientId}/users`,
      );
    }
    history.push(`/users`);
  };

  const postData = async (data) => {
    try {
      setLoaded(false);
      if (id) {
        await putUser(id, data, clientId || user.client_id);
      } else {
        await postCreateUser(data, clientId);
      }
      await enqueueSnackbar(
        intl.formatMessage({
          id: 'save_success',
          defaultMessage: 'Successfully saving',
        }),
        { variant: 'success' },
      );
      detectRedirect();
    } catch (e) {
      setInitialValues({
        phone_number: data.phone_number,
        login: data.login,
        name: data.name,
        email: data.email,
        employees: data.employees,
        role: data.role,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      enqueueSnackbar(errorBuilder(e), {
        variant: 'error',
      });
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
    if (id) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (client) {
      if (id && user) {
        breadcrumbsCreateUserEdit(
          dispatch,
          client.name,
          client.crm.crm,
          clientId,
          user.id,
          user.name,
        );
      } else {
        breadcrumbsCreateUser(
          dispatch,
          client.name,
          client.crm.crm,
          clientId,
        );
      }
    } else {
      if (id && user) {
        breadcrumbsUserEdit(dispatch, user.name);
      }
    }
  }, [client, user]);

  const detectUser = () => user && !user.primary_roles;

  const prepareUsers = () => {
    if (clientId || detectUser()) {
      return roles.filter((role) =>
        ['director', 'employee', 'client'].includes(
          role.role,
        ),
      );
    }

    return roles.filter((role) =>
      ['admin', 'manager', 'observer'].includes(role.role),
    );
  };

  const validateCondition = (values) => {
    if (id) {
      return validateEdit(values);
    }
    return validate(values);
  };

  useEffect(() => {
    if (user) {
      setInitialValues({
        phone_number: user.phone_number,
        login: user.login,
        name: user.name,
        email: user.email,
        sign_in_count: user.sign_in_count,
        employees: user.employees,
        role: extractRole(user.user_role),
      });
    }
  }, [user]);

  if (!loaded) {
    return <Myspinner />;
  }

  return (
    <CreateUser
      id={id}
      roleOptions={prepareUsers()}
      onSubmit={postData}
      initialValues={initialValues}
      validate={validateCondition}
    />
  );
};

CreateUserContainer.propTypes = {
  clientId: PropTypes.string,
  id: PropTypes.string,
};
export default CreateUserContainer;
