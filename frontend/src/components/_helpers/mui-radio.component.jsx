import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const MuiRadio = ({ value, label = '' }) => (
  <FormControlLabel
    label={label}
    control={
      <Field
        name="selected_item"
        component={Radio}
        type="radio"
        value={`${value}`}
      />
    }
  />
);

MuiRadio.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default MuiRadio;
