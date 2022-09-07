import * as PropTypes from 'prop-types';
import { ButtonUI } from '../../ui/prepared';
import { Field, Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@material-ui/core';
import { TextFieldAdapter } from '../../components/_helpers/FinalForm/Controls';
import { validate } from './validate';

const SetPasswordForm = ({ initialValues, onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    initialValues={initialValues}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sm={12}
          alignItems="flex-start"
          spacing={2}
          className="mb-2"
        >
          <Grid item xs={12}>
            <Field
              component={TextFieldAdapter}
              name="password"
              label={
                <FormattedMessage
                  id="new_password"
                  defaultMessage="New password"
                />
              }
              typeField="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextFieldAdapter}
              name="password_repeat"
              label={
                <FormattedMessage
                  id="users.repeat_password"
                  defaultMessage="Repeat password"
                />
              }
              typeField="password"
            />
          </Grid>

          <Grid item xs={12}>
            <ButtonUI
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              text={
                <FormattedMessage
                  id="save"
                  defaultMessage="Save"
                />
              }
            />
          </Grid>
        </Grid>
      </form>
    )}
  />
);

SetPasswordForm.propTypes = {
  initialValues: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SetPasswordForm;
