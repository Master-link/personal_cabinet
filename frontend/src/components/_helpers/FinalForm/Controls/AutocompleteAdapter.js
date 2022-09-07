import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import * as PropTypes from 'prop-types';

export const AutocompleteAdapter = ({
  options = [],
  onChange = () => {},
  name,
  isArrayDefaultValue = true,
  input: { value },
  label,
  variant = 'standard',
  style = { width: '100%' },
  labelName = 'name',
}) => (
  <Autocomplete
    id={name}
    options={options}
    getOptionLabel={(option) => option[labelName]}
    style={style}
    defaultValue={isArrayDefaultValue ? value[0] : value}
    onChange={(_element, value) => {
      onChange(value);
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        name={name}
        label={label}
        variant={variant}
      />
    )}
  />
);

AutocompleteAdapter.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.string,
  variant: PropTypes.string,
  labelName: PropTypes.string,
  isArrayDefaultValue: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
