import React from 'react';
import TextField from '@material-ui/core/TextField';
import * as PropTypes from 'prop-types';

export const InputField = ({
  onChange = () => {},
  label,
  id,
  InputProps = {},
  startAdornment,
  type = 'text',
  style,
  className,
  defaultValue = '',
  variant,
}) => (
  <TextField
    className={className}
    startAdornment={startAdornment}
    style={style}
    id={id}
    InputProps={InputProps}
    label={label}
    type={type}
    onChange={(e) => {
      onChange(e.target.value);
    }}
    InputLabelProps={{
      shrink: true,
    }}
    defaultValue={defaultValue}
    variant={variant}
  />
);

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  InputProps: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
