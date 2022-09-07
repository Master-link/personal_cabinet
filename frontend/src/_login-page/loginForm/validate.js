import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

export const validate = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = REQUIRED_FIELD_MESSAGE;
  }
  if (!password) {
    errors.password = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
