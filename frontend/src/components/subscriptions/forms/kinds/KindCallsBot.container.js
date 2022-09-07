import { useEffect, useState } from 'react';
import { getCallbotOperators } from '../../../../services/operator-http.service';
import { prepareSmsResources } from '../../../../utilities/prepareSmsResources';
import { KindCallsBot } from './KindCallsBot';
import * as PropTypes from 'prop-types';

export const KindCallsBotContainer = ({
  tariff,
  form,
  onAdd,
  onRemove,
  initialValue,
  readOnly,
}) => {
  const [operators, setOperators] = useState([]);

  useEffect(async () => {
    const {
      data: { data },
    } = await getCallbotOperators();
    setOperators(data);

    if (
      initialValue.opsms_attributes &&
      initialValue.opsms_attributes.length !== 0
    ) {
      form.change(
        'opsms_attributes',
        initialValue.opsms_attributes,
      );
    } else {
      form.change(
        'opsms_attributes',
        prepareSmsResources(tariff),
      );
    }
  }, []);

  return (
    <KindCallsBot
      onAdd={onAdd}
      onRemove={onRemove}
      operators={operators}
      form={form}
      tariff={tariff}
      readOnly={readOnly}
    />
  );
};

KindCallsBotContainer.propTypes = {
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  form: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  initialValue: PropTypes.object.isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};
