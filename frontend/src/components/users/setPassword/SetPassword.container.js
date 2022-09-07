import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useIntl, FormattedMessage } from 'react-intl';
import { putNewPassword } from '../../../services/user-http.service';
import { useSnackbar } from 'notistack';
import { SetPassword } from './SetPassword';
import { ButtonUI } from '../../../ui/prepared';
import * as PropTypes from 'prop-types';

export const SetPasswordContainer = ({ user_id }) => {
  const [showForm, setShowForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();

  const setPassword = async (values) => {
    setShowForm(true);
    try {
      await putNewPassword(values);
      enqueueSnackbar(
        intl.formatMessage({
          id: 'user.change_password_success',
          defaultMessage:
            'The password has been changed successfully',
        }),
        {
          variant: 'success',
        },
      );
    } catch (_e) {
      enqueueSnackbar(
        intl.formatMessage({
          id: 'user.change_password_failure',
          defaultMessage:
            'The password has been not changed',
        }),
        { variant: 'error' },
      );
    } finally {
      setShowForm(false);
    }
  };

  return (
    <>
      <ButtonUI
        onClick={() => setShowForm(true)}
        variant="outlined"
        color="secondary"
        text={
          <>
            <EditIcon />
            <FormattedMessage
              id="user.change_password"
              defaultMessage="Set password"
            />
          </>
        }
        className={'ml-3'}
      />

      {showForm && (
        <SetPassword
          onSubmit={setPassword}
          initialValues={{
            user_id,
          }}
          closePopup={() => setShowForm(false)}
        />
      )}
    </>
  );
};

SetPasswordContainer.propTypes = {
  user_id: PropTypes.string.isRequired,
};
