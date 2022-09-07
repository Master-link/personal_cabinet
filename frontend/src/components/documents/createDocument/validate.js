import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

export const validate = (values) => {
  const errors = {};

  if (!values.price) {
    errors.price = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.service?.id) {
    errors.service = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.client_id) {
    errors.client_id = REQUIRED_FIELD_MESSAGE;
  }

  if (!values.tariff_id) {
    errors.tariff_id = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
