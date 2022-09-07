import {
  REQUIRED_FIELD_MESSAGE,
  REQUIRED_EQUAL_FIELDS_MESSAGE,
} from 'src/constants/validations';

export const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = REQUIRED_FIELD_MESSAGE;
  }
  if (!values.login) {
    errors.login = REQUIRED_FIELD_MESSAGE;
  }
  if (!values.email) {
    errors.email = REQUIRED_FIELD_MESSAGE;
  }
  if (!values.phone_number) {
    errors.phone_number = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.password) {
    errors.password = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = REQUIRED_FIELD_MESSAGE;
  }

  if (values.password !== values.password_confirmation) {
    errors.password = REQUIRED_EQUAL_FIELDS_MESSAGE;
    errors.password_confirmation = REQUIRED_EQUAL_FIELDS_MESSAGE;
  }

  if (!values.role) {
    errors.role = REQUIRED_FIELD_MESSAGE;
  }
  return errors;
};
