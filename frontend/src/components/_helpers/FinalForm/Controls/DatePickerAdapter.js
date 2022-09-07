import { DatePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ruLocale from 'date-fns/locale/ru';

export const DatePickerAdapter = ({
  input,
  label,
  disabled = false,
  format = 'dd/MM/yyyy',
  onChange = () => {},
}) => {
  const [selectedDate, handleDateChange] = useState(null);

  useEffect(() => {
    handleDateChange(input.value);
  }, [input.value]);

  return (
    <div className="flex_center">
      <DatePicker
        id={input.name}
        name={input.name}
        dateFunsUtils={DateFnsUtils}
        label={label}
        format={format}
        disabled={disabled}
        onChange={(value) => {
          input.onChange(value);
          handleDateChange(value);
          onChange(value);
        }}
        locale={ruLocale}
      />
      {selectedDate && !disabled && (
        <IconButton
          edge="end"
          size="small"
          disabled={!selectedDate}
          onClick={() => {
            handleDateChange(null);
            input.onChange(null);
            onChange(null);
          }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
};

DatePickerAdapter.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  format: PropTypes.string,
  onChange: PropTypes.func,
};
