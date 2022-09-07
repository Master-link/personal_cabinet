import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

export const validate = (values) => {
  const errors = {};

  if (!values.service?.id) {
    errors.service = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.tariff?.id) {
    errors.tariff = REQUIRED_FIELD_MESSAGE;
  }
  if (!values.date_activation) {
    errors.date_activation = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
