import { Field, Form } from 'react-final-form';
import { Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { TextFieldAdapter } from '../components/_helpers/FinalForm/Controls';
import { ButtonUI } from '../ui/prepared';
import * as PropTypes from 'prop-types';
import { validate } from './resetPassword/validate';

const ResetForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sm={12}
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={12}>
            <Field
              component={TextFieldAdapter}
              name="reset_input"
              label={
                <FormattedMessage
                  id="users.login_or_mail"
                  defaultMessage="Login or mail"
                />
              }
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
                  id="reset_passsword"
                  defaultMessage="Reset password"
                />
              }
            />
          </Grid>
        </Grid>
      </form>
    )}
  />
);

ResetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ResetForm;
