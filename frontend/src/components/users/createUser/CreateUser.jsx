import { FormattedMessage } from 'react-intl';
import { Grid } from '@material-ui/core';
import { ButtonUI } from '../../../ui/prepared';
import cn from 'classnames';
import {
  SelectAdapter,
  TextFieldAdapter,
} from '../../_helpers/FinalForm/Controls';
import { Field, Form } from 'react-final-form';
import * as PropTypes from 'prop-types';
import { PermissionsUtility } from '../../../utilities/permissions.utility';
import {
  EDIT_USER,
  SETPASSWORD_USER,
} from '../../../constants/permissions';
import { ResetPassword } from '../resetPassword/ResetPassword';
import { SetPasswordContainer } from '../setPassword/SetPassword.container';
import { PanelForm } from './PanelForm';

export const CreateUser = ({
  id,
  onSubmit,
  initialValues,
  roleOptions,
  validate,
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex_column">
          <div className="flex_panel">
            <PanelForm
              formButtons={
                <>
                  <Grid item>
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
                  {PermissionsUtility(EDIT_USER) && id && (
                    <ResetPassword user_id={id} />
                  )}

                  {PermissionsUtility(SETPASSWORD_USER) &&
                    id && (
                      <SetPasswordContainer user_id={id} />
                    )}
                </>
              }
            />
          </div>

          <div className="flex_center">
            <Grid
              container
              sm={12}
              lg={12}
              xs={12}
              alignItems="flex-start"
              className={cn(
                'p-20',
                'max-w600',
                'margin0auto',
              )}
              spacing={2}
            >
              <Grid item xs={12}>
                <Field
                  component={TextFieldAdapter}
                  name="name"
                  label={
                    <FormattedMessage
                      id="users.fio"
                      defaultMessage="Name"
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  disabled={id}
                  component={TextFieldAdapter}
                  name="login"
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
                  name="phone_number"
                  label={
                    <FormattedMessage
                      id="phone"
                      defaultMessage="Phone"
                    />
                  }
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Field
                  component={SelectAdapter}
                  name="role"
                  label={
                    <FormattedMessage
                      id="role"
                      defaultMessage="Role"
                    />
                  }
                  keyId="role"
                  keyName="name"
                  options={roleOptions}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Field
                  component={TextFieldAdapter}
                  name="email"
                  label={
                    <FormattedMessage
                      id="email"
                      defaultMessage="Email"
                    />
                  }
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Field
                  disabled={id}
                  component={TextFieldAdapter}
                  name="password"
                  label={
                    <FormattedMessage
                      id="users.password"
                      defaultMessage="Password"
                    />
                  }
                  typeField="password"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Field
                  disabled={id}
                  component={TextFieldAdapter}
                  name="password_confirmation"
                  label={
                    <FormattedMessage
                      id="users.repeat_password"
                      defaultMessage="Repeat password"
                    />
                  }
                  typeField="password"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
    )}
  />
);

CreateUser.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    phone_number: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    employees: PropTypes.string.isRequired,
    sign_in_count: PropTypes.number.isRequired,
  }).isRequired,
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  validate: PropTypes.func.isRequired,
};
