import { resetUserPassword } from '../../../services/user-http.service';
import { FormattedMessage, useIntl } from 'react-intl';
import { ButtonUI, YesOrNoUI } from '../../../ui/prepared';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import * as PropTypes from 'prop-types';

export const ResetPassword = ({ user_id }) => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const resetUserPasswordRequest = async () => {
    try {
      await resetUserPassword(user_id);
      enqueueSnackbar(
        intl.formatMessage({
          id: 'user.password_has_been_reset',
          defaultMessage: 'The password has been reset',
        }),
        {
          variant: 'success',
        },
      );
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <ButtonUI
        variant="outlined"
        color="secondary"
        onClick={() => setIsOpenDialog(true)}
        text={
          <FormattedMessage
            id="users.reset_password"
            defaultMessage="Reset password"
          />
        }
        className={'ml-3'}
      />
      <YesOrNoUI
        description={
          <FormattedMessage
            id="users.do_you_want_reset_password"
            defaultMessage="Do you want reset password ?"
          />
        }
        onCancel={() => {
          setIsOpenDialog(false);
        }}
        onConfirm={async () => {
          setIsOpenDialog(false);
          await resetUserPasswordRequest();
        }}
        isOpen={isOpenDialog}
      />
    </>
  );
};

ResetPassword.propTypes = {
  user_id: PropTypes.string.isRequired,
};
