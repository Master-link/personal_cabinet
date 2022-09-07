import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { YesOrNoUI } from '../../ui/prepared/dialogs';
import * as PropTypes from 'prop-types';
import { deleteUser } from '../../services/user-http.service';
import { ButtonUI } from '../../ui/prepared/buttons';
import { useHistory } from 'react-router-dom';

export const DeleteUser = ({
  client_id,
  user_id,
  user_name,
}) => {
  const intl = useIntl();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const _deleteUser = (id) => {
    deleteUser(id)
      .then(() => {
        enqueueSnackbar(
          intl.formatMessage({
            id: 'success.delete_user',
            defaultMessage: 'Success deleting an user',
          }),
          { variant: 'success' },
        );
        history.push(`/clients/show/${client_id}/users`);
      })
      .catch((e) => {
        enqueueSnackbar(
          intl.formatMessage({
            id: 'error.delete_user',
            defaultMessage: 'Error deleting  an user',
          }),
          { variant: 'error' },
        );
      });
  };

  return (
    <>
      <ButtonUI
        className="ml-2"
        color={'secondary'}
        onClick={() => setOpen(true)}
        text={intl.formatMessage({
          id: 'delete_user',
          defaultMessage: 'Delete user',
        })}
      />

      <YesOrNoUI
        description={intl.formatMessage(
          {
            id: 'is_delete_user',
            defaultMessage: `Is Delete the User {user} ?`,
          },
          { user: user_name },
        )}
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          _deleteUser(user_id);
        }}
        isOpen={open}
      />
    </>
  );
};

DeleteUser.propTypes = {
  client_id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  user_name: PropTypes.string.isRequired,
};
