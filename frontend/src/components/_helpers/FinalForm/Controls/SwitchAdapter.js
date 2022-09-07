import * as PropTypes from 'prop-types';
import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import { Switch } from '@material-ui/core';
import cn from 'classnames';

export const SwitchAdapter = ({
  input,
  required,
  label,
  meta,
  onChange = () => {},
  disabled = false,
}) => {
  const rootClass = cn(
    'MuiInputLabel-shrink',
    meta.submitFailed &&
      meta.error &&
      required &&
      'Mui-error',
  );

  return (
    <>
      <FormLabel component="legend" className={rootClass}>
        {label}
      </FormLabel>
      <Switch
        id={`switch_${input.name}`}
        checked={
          String(input.value) !== 'false' && input.value
        }
        name={input.name}
        onChange={(value) => {
          onChange(value.target.checked);
          input.onChange(value);
        }}
        disabled={disabled}
      />
      {rootClass && (
        <p className="is_required">{meta.error}</p>
      )}
    </>
  );
};

SwitchAdapter.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    submitFailed: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  initialData: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.string.isRequired,
};
