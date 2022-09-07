import { TextField } from 'mui-rff';
import * as PropTypes from 'prop-types';
import React from 'react';

export const PasswordFieldAdapter = ({ input, label }) => (
  <TextField
    name={input.name}
    label={label}
    type="password"
  />
);

PasswordFieldAdapter.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};
