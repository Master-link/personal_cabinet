import * as PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';

export const ChipInputFieldAdapter = ({
  label,
  helperText,
  meta,
  defaultData,
  disabled,
}) => (
  <ChipInput
    disabled={disabled}
    fullWidth
    value={defaultData}
    label={label}
    helperText={helperText}
    error={meta.submitError}
    aria-errormessage={meta.submitError}
  />
);

ChipInputFieldAdapter.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultData: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};
