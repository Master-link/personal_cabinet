import { messageI18n } from 'src/services/intl/intl';

export const REQUIRED_FIELD_MESSAGE = messageI18n(
  'required',
  'Required',
);

export const POSITIVE_FIELD_MESSAGE = messageI18n(
  'minimal_value',
  'Minimal value is: {value}',
  { value: 5 },
);
