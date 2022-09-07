import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm, change } from 'redux-form';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useSnackbar } from 'notistack';
import { useIntl, FormattedMessage } from 'react-intl';
import '../../share/share.style.scss';

const renderTextField = ({
  label,
  key,
  input,
  required,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    key={key}
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    style={{ margin: '10px' }}
    required
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton aria-label="toggle password visibility" edge="end">
            <VisibilityOff />
          </IconButton>
        </InputAdornment>
      ),
    }}
    {...input}
    {...custom}
  />
);

const CreateForm = ({ initialValues, kind, onClose, ...props }) => {
  const intl = useIntl();
  const { handleSubmit, pristine, reset, submitting } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [password, setPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState(false);
  const [errors, setErrors] = useState('');

  const handleChange = (prop) => (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(true);
  };

  const handleMouseDownPassword = (event) => {
    setShowPassword(false);
  };

  const handleOldChange = (prop) => (event) => {
    setOldPassword(event.target.value);
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword(true);
  };

  const handleMouseDownOldPassword = (event) => {
    setShowOldPassword(false);
  };

  const handleRepeatChange = (prop) => (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(true);
  };

  const handleMouseDownRepeatPassword = (event) => {
    setShowRepeatPassword(false);
  };

  const filledAll = () => {
    return ((password === oldPassword) === repeatPassword) !== '';
  };

  const checkRepeat = () => {
    return password === repeatPassword;
  };

  const checkSubmit = (data) => {
    if (filledAll() && checkRepeat()) {
      handleSubmit(data);
    } else {
      enqueueSnackbar(errors, { variant: 'warning' });
      data.preventDefault();
    }
  };

  useEffect(() => {
    if (((password === oldPassword) === repeatPassword) === '') {
      setErrors('Пароли не могут быть пустыми');
    }
    if (password !== repeatPassword) {
      setErrors('Пароль и повтор пароля должны быть одинаковыми');
    }
  }, [password, oldPassword, repeatPassword]);

  return (
    <>
      <form onSubmit={checkSubmit}>
        <div className="panel p_25-1_25-1">
          <div className="subpanel space_btw">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={pristine || submitting}
            >
              <FormattedMessage id="save" defaultMessage="Save" />
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              <FormattedMessage id="close" defaultMessage="Close" />
            </Button>
          </div>
        </div>

        <div style={{ padding: '10px 20px 30px' }}>
          <div>
            <FormControl style={{ width: '100%' }}>
              <Field
                key="old_password"
                name="old_password"
                component={renderTextField}
                label={intl.formatMessage({
                  id: 'old_password',
                  defaultMessage: 'Old password',
                })}
                required={true}
                type={showOldPassword ? 'text' : 'password'}
                value={password}
                onChange={handleOldChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownOldPassword}
                        edge="end"
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl style={{ width: '100%' }}>
              <Field
                key="password"
                name="password"
                component={renderTextField}
                label={intl.formatMessage({
                  id: 'new_password',
                  defaultMessage: 'New password',
                })}
                required={true}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl style={{ width: '100%' }}>
              <Field
                key="repeat_password"
                name="repeat_password"
                component={renderTextField}
                label={intl.formatMessage({
                  id: 'repeat_password',
                  defaultMessage: 'Repeat password',
                })}
                required={true}
                type={showRepeatPassword ? 'text' : 'password'}
                value={repeatPassword}
                onChange={handleRepeatChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRepeatPassword}
                        onMouseDown={handleMouseDownRepeatPassword}
                        edge="end"
                      >
                        {showRepeatPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('changePassword', field, value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'changePassword' })(CreateForm));
