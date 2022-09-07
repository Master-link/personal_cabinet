import { INCORRECT_EMAIL } from 'src/constants/validations';

export const validate = (values) => {
  const errors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = INCORRECT_EMAIL;
  }

  return errors;
};
