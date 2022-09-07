import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

export const validate = ({ password }) => {
  const errors = {};

  if (!password) {
    errors.password = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
