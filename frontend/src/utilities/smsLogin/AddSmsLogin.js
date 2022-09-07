import * as PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { validate } from './validate';
import { SaveAndClose } from 'src/ui/prepared/dialogActions/SaveAndClose';
import { UiDialog } from 'src/ui/prepared/dialogs/UiDialog';

export const AddSmsLogin = ({
  onSubmit,
  login,
  client_id,
  password,
  onClose,
}) => {
  let submit = () => {};

  return (
    <UiDialog
      dialogContent={
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={validate}
          initialValues={{
            login,
            client_id,
            password,
          }}
          render={({ handleSubmit, _form }) => {
            submit = handleSubmit;
            return (
              <form onSubmit={handleSubmit} noValidate>
                <Grid
                  container
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Field name="login">
                      {({ _input, _meta }) => (
                        <TextField
                          name="login"
                          type="text"
                          label={
                            <FormattedMessage
                              id="login"
                              defaultMessage="Login"
                            />
                          }
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field name="password">
                      {({ _input, _meta }) => (
                        <TextField
                          name="password"
                          type="text"
                          label={
                            <FormattedMessage
                              id="password"
                              defaultMessage="Password"
                            />
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        />
      }
      onCloseDialog={onClose}
      dialogTitle={
        <FormattedMessage
          id="sms.new"
          defaultMessage="New SMS login"
        />
      }
      actions={
        <SaveAndClose
          onCloseDialog={onClose}
          onSubmit={(event) => {
            submit(event);
          }}
        />
      }
      open
    />
  );
};

AddSmsLogin.propTypes = {
  login: PropTypes.string.isRequired,
  client_id: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
