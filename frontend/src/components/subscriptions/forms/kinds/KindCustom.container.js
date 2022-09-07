import { KindCustom } from './KindCustom';
import * as PropTypes from 'prop-types';

export const KindCustomContainer = ({
  tariff,
  form,
  readOnly,
}) => (
  <KindCustom
    form={form}
    tariff={tariff}
    readOnly={readOnly}
  />
);

KindCustomContainer.propTypes = {
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  form: PropTypes.object.isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};
