import { Select } from 'mui-rff';
import * as PropTypes from 'prop-types';
import React from 'react';
import { MenuItem } from '@material-ui/core';

export const SelectAdapter = ({
  input,
  label,
  options = [],
  className = '',
  allowEmpty = false,
  disabled = false,
  emptyText = 'empty',
  onChange = () => {},
  keyId = 'id',
  keyName = 'title',
}) => (
  <Select
    className={className}
    name={input.name}
    label={label}
    disabled={disabled}
    formControlProps={{ margin: 'none' }}
    onChange={(value) => {
      onChange(value);
      input.onChange(value);
    }}
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

SelectAdapter.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  allowEmpty: PropTypes.bool,
  className: PropTypes.string,
  keyId: PropTypes.string,
  keyName: PropTypes.string,
  emptyText: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
