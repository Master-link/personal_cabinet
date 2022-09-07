import { REQUIRED_FIELD_MESSAGE } from '../../../constants/validations';

export const validate = ({ from, to, started_at }) => {
  const errors = {};

  if (!from) {
    errors.from = REQUIRED_FIELD_MESSAGE;
  }

  if (!to) {
    errors.to = REQUIRED_FIELD_MESSAGE;
  }

  if (!started_at) {
    errors.started_at = REQUIRED_FIELD_MESSAGE;
  }

  return errors;
};
