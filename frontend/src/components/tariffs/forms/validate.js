import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';

const validateName = ({ name }) => {
  if (!name)
    return {
      name: REQUIRED_FIELD_MESSAGE,
    };

  return {};
};

const validateKind = ({ kind }) => {
  if (!kind)
    return {
      kind: REQUIRED_FIELD_MESSAGE,
    };

  return {};
};

const validateDurationKind = ({ duration_kind }) => {
  if (!duration_kind)
    return {
      duration_kind: REQUIRED_FIELD_MESSAGE,
    };

  return {};
};

const validateStartedAt = ({ started_at }) => {
  if (!started_at)
    return {
      started_at: REQUIRED_FIELD_MESSAGE,
    };

  return {};
};

const validateCustomPeriod = ({ duration_kind, extra }) => {
  if (
    [
      'duration_custom_days',
      'duration_custom_months',
    ].includes(duration_kind) &&
    ((extra && !extra.custom_period) || !extra)
  )
    return {
      extra: { custom_period: REQUIRED_FIELD_MESSAGE },
    };

  return {};
};

export const validate = (values) => {
  return {
    ...validateName(values),
    ...validateKind(values),
    ...validateDurationKind(values),
    ...validateStartedAt(values),
    ...validateCustomPeriod(values),
  };
};
