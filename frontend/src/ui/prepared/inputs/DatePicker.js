import React, {useState} from "react";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import * as PropTypes from 'prop-types';

export const DatePicker = ({
  handleDateChange = ()=>{},
  label='Date',
  value=moment(),
  className='',
}) => {

  const [selectedDate, setSelectedDate] = useState(value);

  const onChangeAction = (value='') => {
    setSelectedDate(value);
    handleDateChange(value);
  }

  return <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
    key={value}
    className={className}
    id="date-picker-dialog"
    label={label}
    format="dd/MM/yyyy"
    value={selectedDate}
    onChange={onChangeAction}
    autoOk={true}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
    /></MuiPickersUtilsProvider>;
}

DatePicker.propTypes = {
  handleDateChange: PropTypes.func,
};
