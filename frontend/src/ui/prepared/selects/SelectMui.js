import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const SelectMui = ({
  allowEmpty = true,
  className = '',
  handleChange = () => {},
  items = [],
  keyId = 'id',
  keyName = 'name',
  label = 'Label',
  style = {},
  value = 'null',
}) => {
  const [selectedValue, setSelectedValue] = useState();
  const onChangeAction = (value = '') => {
    setSelectedValue(value);
    handleChange(value);
  };

  return (
    <FormControl className={className} style={style}>
      <InputLabel id="demo-simple-select-label">
        {label}
      </InputLabel>
      <Select
        labelId="select-manager-label"
        id="services-select"
        value={selectedValue || value}
        onChange={(v, _e) => onChangeAction(v.target.value)}
      >
        {allowEmpty && (
          <MenuItem value="null">Не выбран</MenuItem>
        )}
        {items.map((item, index) => (
          <MenuItem key={index} value={item[keyId]}>
            {item[keyName]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectMui.propTypes = {
  allowEmpty: PropTypes.bool,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  items: PropTypes.array,
  keyId: PropTypes.string,
  keyName: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string,
};
