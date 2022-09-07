import { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { useSnackbar } from 'notistack';
import { FormattedMessage, useIntl } from 'react-intl';
import AddIcon from '@material-ui/icons/Add';
import { addSmsLogin } from 'src/services/smslogin-http.service';
import {
  setData,
  setId,
} from 'src/redux/smslogin/smslogin.actions';
import * as PropTypes from 'prop-types';
import { fetchSmsLogins } from 'src/components/subscriptions/forms/kinds/fetchSmsLogins';
import { AddSmsLogin } from './AddSmsLogin';
import { ButtonUI } from '../../ui/prepared';

const generatePassword = () => {
  var length = 8,
    charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const AddSmsLoginContainer = ({
  client_id,
  crm,
  setData,
  setId,
  onAdd,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();
  const [showForm, setShowForm] = useState(false);

  const snackbar = () =>
    enqueueSnackbar(
      intl.formatMessage({
        id: 'successfully_save',
        defaultMessage: 'Successfully save',
      }),
      {
        variant: 'success',
      },
    );

  const postData = async (values) => {
    try {
      const {
        data: { id, login },
      } = await addSmsLogin(values);
      const allLogins = await fetchSmsLogins(client_id);
      setData(allLogins);
      onAdd({ id: id, title: login });
      setId(id);
      setShowForm(false);
      snackbar();
    } catch (e) {
      e.response.data.errors.details.login.map(
        (error, _index) => {
          enqueueSnackbar(error, {
            variant: 'error',
          });
        },
      );
      console.error(e.errors);
    }
  };

  return (
    <>
      <ButtonUI
        variant="contained"
        color="primary"
        onClick={() => setShowForm(true)}
        text={
          <>
            <AddIcon />
            <FormattedMessage
              id="sms.to_create"
              defaultMessage="Add SMS login"
            />
          </>
        }
      />

      {showForm && (
        <AddSmsLogin
          onSubmit={postData}
          onClose={() => setShowForm(false)}
          login={`ID${crm}`}
          client_id={client_id}
          password={generatePassword()}
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data) => dispatch(setData(data)),
    setId: (id) => dispatch(setId(id)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({ form: 'createSmsLogin' })(
    AddSmsLoginContainer,
  ),
);

AddSmsLoginContainer.propTypes = {
  client_id: PropTypes.string.isRequired,
  crm: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
