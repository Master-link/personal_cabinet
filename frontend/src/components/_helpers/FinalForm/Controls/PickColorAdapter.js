import * as PropTypes from 'prop-types';
import { ColorPicker } from 'react-pick-color';

export const PickColorAdapter = ({
  color,
  onChange = () => {},
}) => <ColorPicker color={color} onChange={onChange} />;

PickColorAdapter.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
