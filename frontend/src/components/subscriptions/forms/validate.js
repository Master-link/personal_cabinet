import { REQUIRED_FIELD_MESSAGE } from 'src/constants/validations';
import {
  SMS_GATE,
  TAXOPHONE,
  TECH_SUPPORT,
} from '../../../constants/types';

const validateTariffId = ({ tariff_id }) => {
  if (!tariff_id)
    return {
      tariff_id: REQUIRED_FIELD_MESSAGE,
    };

  return {};
};

const validateServiceId = ({ service_id }) => {
  if (!service_id)
    return {
      service_id: REQUIRED_FIELD_MESSAGE,
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

const validateEndedAt = (
  { ended_at },
  { kind, ended_at: endedAt },
) => {
  if (!ended_at && kind === 'kind_periodic' && !!endedAt) {
    return {
      ended_at: REQUIRED_FIELD_MESSAGE,
    };
  }

  return {};
};

const validateTaxophone = ({ ended_at }, kind) => {
  if (kind === TAXOPHONE) {
    if (!ended_at)
      return {
        ended_at: REQUIRED_FIELD_MESSAGE,
      };
  }

  return {};
};

const validateSmsGate = (values, kind) => {
  if (kind === SMS_GATE) {
    if (values.jsondata && !values.jsondata.sms_login)
      return {
        jsondata: { sms_login: REQUIRED_FIELD_MESSAGE },
      };
  }

  return {};
};

const validateTechSupport = (values, kind, tariff) => {
  if (kind === TECH_SUPPORT) {
    if (tariff.extra.new_tariff) {
      if (
        !values.jsondata.new_tariff_hours ||
        !values.jsondata.new_tariff_slas
      )
        return {
          jsondata: {
            new_tariff_hours: REQUIRED_FIELD_MESSAGE,
            new_tariff_slas: REQUIRED_FIELD_MESSAGE,
          },
        };
    }
  }

  return {};
};

export const validate = (values, service, tariff) => {
  const {
    ticket: { kind },
  } = service;

  return {
    ...validateTariffId(values),
    ...validateServiceId(values),
    ...validateStartedAt(values),
    ...validateEndedAt(values, tariff),
    ...validateTaxophone(values, kind),
    ...validateSmsGate(values, kind),
    ...validateTechSupport(values, kind, tariff),
  };
};
