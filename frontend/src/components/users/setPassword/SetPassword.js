import * as PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';
import React from 'react';
import { SaveAndClose } from '../../../ui/prepared/dialogActions/SaveAndClose';
import { UiDialog } from '../../../ui/prepared/dialogs/UiDialog';
import { TextField } from 'mui-rff';
import { validate } from './validate';

export const SetPassword = ({
  onSubmit,
  initialValues,
  closePopup,
}) => {
  let submit = () => {};

  return (
    <UiDialog
      dialogContent={
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, form }) => {
            submit = handleSubmit;
            return (
              <form onSubmit={handleSubmit} noValidate>
                <Grid
                  container
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Field name="password">
                      {({ input, meta }) => (
                        <TextField
                          name="password"
                          type="password"
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
      onCloseDialog={closePopup}
      dialogTitle={
        <FormattedMessage
          id="user.set_new_password"
          defaultMessage="Changing password for the user"
        />
      }
      actions={
        <SaveAndClose
          onCloseDialog={closePopup}
          onSubmit={(event) => {
            submit(event);
          }}
        />
      }
      open
    />
  );
};
SetPassword.propTypes = {
  initialValues: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};
