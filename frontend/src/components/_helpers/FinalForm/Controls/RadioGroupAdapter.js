import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as PropTypes from 'prop-types';
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export const RadioGroupAdapter = ({
  input,
  label,
  myDefaultValue,
  options = [],
}) => (
  <>
    {label && (
      <FormLabel component="legend">{label}</FormLabel>
    )}
    <RadioGroup
      aria-label="label"
      defaultValue={myDefaultValue}
      onChange={(value) => {
        input.onChange(value);
      }}
      name={input.name}
    >
      {options.map((item, index) => (
        <FormControlLabel
          key={index}
          value={item.value}
          control={<Radio />}
          label={item.label}
        />
      ))}
    </RadioGroup>
  </>
);

RadioGroupAdapter.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  myDefaultValue: PropTypes.string,
};
