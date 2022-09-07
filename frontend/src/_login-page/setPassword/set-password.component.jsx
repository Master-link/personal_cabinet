import '../login-page.scss';
import cn from 'classnames';
import queryString from 'query-string';
import SetPasswordForm from './set-password-form.component';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { passwordResetPost } from '../../services/user-http.service';
import * as PropTypes from 'prop-types';

const SetPassword = ({ location }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const query = queryString.parse(location.search);

  const passwordReset = async (values) => {
    try {
      await passwordResetPost({
        password: values,
      });
      history.push('/login');
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <div className="setpass">
      <div>
        <img src="/img/logo.png" alt="" />
        <h6
          className={cn('font-weight-bold', 'mt-5', 'bt-3')}
        >
          Установка нового пароля
        </h6>
        <SetPasswordForm
          initialValues={{
            token: query.token,
            email: query.email,
          }}
          onSubmit={passwordReset}
        />
      </div>
    </div>
  );
};

SetPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.shape({
      token: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SetPassword;
