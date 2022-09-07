import DateFnsUtils from '@date-io/date-fns';
import { ru } from 'date-fns/locale';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React from 'react';

export const KeyboardDatePickerAdapter = ({
  input: { onChange, value },
  name,
  format = 'dd/MM/yyyy',
  ...rest
}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
    <KeyboardDatePicker
      name={name}
      value={value}
      onChange={(date) => onChange(date)}
      format={format}
      {...rest}
    />
  </MuiPickersUtilsProvider>
);
