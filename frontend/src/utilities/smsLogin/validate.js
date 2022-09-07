import { REQUIRED_FIELD_MESSAGE } from '../../constants/validations';

export const validate = ({ login, password }) => {
  const errors = {};

  if (!login) {
    errors.login = REQUIRED_FIELD_MESSAGE;
  }

  if (!password) {
    errors.password = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
