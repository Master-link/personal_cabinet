import {
  REQUIRED_FIELD_MESSAGE,
  REQUIRED_EQUAL_FIELDS_MESSAGE,
} from 'src/constants/validations';

export const validateEdit = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.email) {
    errors.email = REQUIRED_FIELD_MESSAGE;
  }
  if (!values.phone_number) {
    errors.phone_number = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.role) {
    errors.role = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
