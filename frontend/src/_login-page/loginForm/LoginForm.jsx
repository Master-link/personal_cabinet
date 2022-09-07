import { Field, Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@material-ui/core';
import { TextFieldAdapter } from '../../components/_helpers/FinalForm/Controls';
import { ButtonUI } from '../../ui/prepared';
import * as PropTypes from 'prop-types';
import { validate } from './validate';

const LoginForm = ({ onSubmit }) => (
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
          className="mb-2"
        >
          <Grid item xs={12}>
            <Field
              component={TextFieldAdapter}
              name="email"
              label={
                <FormattedMessage
                  id="users.login"
                  defaultMessage="Login"
                />
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextFieldAdapter}
              name="password"
              label={
                <FormattedMessage
                  id="password"
                  defaultMessage="Password"
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
                  id="sign_in"
                  defaultMessage="Sign in"
                />
              }
            />
          </Grid>
        </Grid>
      </form>
    )}
  />
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
