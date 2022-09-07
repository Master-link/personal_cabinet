import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

const MuiCheckbox = ({
  input,
  label,
  onChange = () => {},
  className = '',
  classNameCheckbox = '',
}) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={!!input.value}
        onChange={(value) => {
          input.onChange(value);
          onChange(value);
        }}
        className={classNameCheckbox}
      />
    }
    label={label}
    className={className}
  />
);

MuiCheckbox.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.bool,
    onChange: PropTypes.func,
  }).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  classNameLabel: PropTypes.string,
};

export default MuiCheckbox;
