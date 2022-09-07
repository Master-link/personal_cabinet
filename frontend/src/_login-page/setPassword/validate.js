import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

export const validate = ({ password, password_repeat }) => {
  const errors = {};

  if (!password) {
    errors.password = REQUIRED_FIELD_MESSAGE;
  }

  if (!password_repeat) {
    errors.password_repeat = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
