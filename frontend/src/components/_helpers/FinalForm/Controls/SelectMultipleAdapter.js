import { Select } from 'mui-rff';
import * as PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';

const parseValues = (values) => {
  if (!values || values.length === 0) {
    return [];
  }

  if (Array.isArray(values)) {
    return values;
  }

  return Number.isInteger(values)
    ? values.toString().split(',').filter(Number)
    : values.split(',').filter(Number);
};

export const SelectMultipleAdapter = ({
  allowEmpty = false,
  className = '',
  disabled = false,
  emptyText = 'empty',
  input,
  isMultiple = false,
  keyId = 'id',
  keyName = 'title',
  label,
  onChange = () => {},
  options = [],
}) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    onChange(value);
  };

  return (
    <Select
      className={className}
      name={input.name}
      label={label}
      value={parseValues(input.value)}
      multiple={isMultiple}
      disabled={disabled}
      formControlProps={{ margin: 'none' }}
      onChange={handleChange}
    >
      {allowEmpty && (
        <MenuItem value="null">{emptyText}</MenuItem>
      )}
      {options.map((item, index) => (
        <MenuItem
          key={index}
          value={item[keyId]}
          disabled={item.disabled}
        >
          {item[keyName]}
        </MenuItem>
      ))}
    </Select>
  );
};

SelectMultipleAdapter.propTypes = {
  allowEmpty: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  emptyText: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isMultiple: PropTypes.bool,
  keyId: PropTypes.string,
  keyName: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};
