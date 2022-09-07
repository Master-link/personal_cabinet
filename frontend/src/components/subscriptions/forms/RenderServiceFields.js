import {
  CALLS_BOT,
  PAYMENT_GATE,
  SMS_GATE,
  TAXOPHONE,
  TECH_SUPPORT,
} from '../../../constants/types';
import * as PropTypes from 'prop-types';
import { KindCallsBotContainer } from './kinds/KindCallsBot.container';
import KindSmsGateContainer from './kinds/KindSmsGate.container';
import { KindTechSupportContainer } from './kinds/KindTechSupport.container';
import { KindCustomContainer } from './kinds/KindCustom.container';

export const RenderServiceFields = ({
  client_id,
  crm,
  service,
  tariff,
  form,
  onAdd,
  onRemove,
  initialValue,
  readOnly,
}) => {
  const {
    ticket: { kind },
  } = service;

  switch (kind) {
    case TAXOPHONE:
      return (
        <KindCustomContainer
          tariff={tariff}
          form={form}
          readOnly={readOnly}
        />
      );
      break;
    case PAYMENT_GATE:
      return (
        <KindCustomContainer
          tariff={tariff}
          form={form}
          readOnly={readOnly}
        />
      );
      break;
    case TECH_SUPPORT:
      return (
        <KindTechSupportContainer
          tariff={tariff}
          form={form}
          readOnly={readOnly}
        />
      );
      break;
    case CALLS_BOT:
      return (
        <KindCallsBotContainer
          tariff={tariff}
          form={form}
          onAdd={onAdd}
          onRemove={onRemove}
          initialValue={initialValue}
          readOnly={readOnly}
        />
      );
      break;
    case SMS_GATE:
      return (
        <KindSmsGateContainer
          client_id={client_id}
          crm={crm}
          initialValue={initialValue}
          tariff={tariff}
          form={form}
          onAdd={onAdd}
          onRemove={onRemove}
          readOnly={readOnly}
        />
      );
      break;
    case 'custom':
      return (
        <KindCustomContainer
          tariff={tariff}
          form={form}
          readOnly={readOnly}
        />
      );
      break;
    default:
      return <>No template</>;
  }
};

KindCallsBotContainer.propTypes = {
  client_id: PropTypes.number.isRequired,
  crm: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  initialValue: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  service: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
