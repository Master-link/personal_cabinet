import { TextField } from 'mui-rff';
import * as PropTypes from 'prop-types';
import React from 'react';

export const TextFieldAdapter = ({
  input,
  label,
  multiline = false,
  rows = 5,
  rowsMax = 10,
  typeField = 'text',
  className = '',
  disabled = false,
  autoFocus = false,
  onChange = () => {},
  InputProps,
}) => (
  <TextField
    className={className}
    disabled={disabled}
    name={input.name}
    label={label}
    multiline={multiline}
    rows={rows}
    rowsMax={rowsMax}
    type={typeField}
    InputProps={InputProps}
    onChange={(value) => {
      input.onChange(value);
      onChange(value);
    }}
    autoFocus={autoFocus}
  />
);

TextFieldAdapter.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  min: PropTypes.number,
  typeField: PropTypes.string,
  InputProps: PropTypes.object,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};
