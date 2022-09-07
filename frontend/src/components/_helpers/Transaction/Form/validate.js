import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

export const validate = (values) => {
  const errors = {};

  if (!values.money) {
    errors.money = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.service?.id) {
    errors.service = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.client?.id) {
    errors.client = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
