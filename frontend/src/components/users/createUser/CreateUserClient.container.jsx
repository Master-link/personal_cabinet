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
import { breadcrumbsCreateUserClient } from './breadcrumbsCreateUserClient';
import { roles } from '../roles';
import { breadcrumbsCreateUserClientEdit } from './breadcrumbsCreateUserClientEdit';
import { validate } from './validate';
import { validateEdit } from './validateEdit';
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

const CreateUserClientContainer = ({ clientId, id }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [loaded, setLoaded] = useState(true);
  const [user, setUser] = useState(null);
  const [initialValues, setInitialValues] = useState({});

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

  const postData = async (data) => {
    try {
      setLoaded(false);
      if (id) {
        await putUser(id, data, clientId);
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
      history.push('/users_client');
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
    if (id) {
      fetchUser();
    } else {
      breadcrumbsCreateUserClient(dispatch);
    }
  }, []);

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

      breadcrumbsCreateUserClientEdit(
        dispatch,
        user.id,
        user.name,
      );
    }
  }, [user]);

  const prepareUsers = () =>
    roles.filter((role) =>
      ['director', 'employee'].includes(role.role),
    );

  const validateCondition = (values) => {
    if (id) {
      return validateEdit(values);
    }
    return validate(values);
  };

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

CreateUserClientContainer.propTypes = {
  clientId: PropTypes.string,
  id: PropTypes.string,
};

export default CreateUserClientContainer;
