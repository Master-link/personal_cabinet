import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

export const validate = ({ reset_input }) => {
  const errors = {};

  if (!reset_input) {
    errors.reset_input = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
