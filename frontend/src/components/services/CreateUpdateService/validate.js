import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

export const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
