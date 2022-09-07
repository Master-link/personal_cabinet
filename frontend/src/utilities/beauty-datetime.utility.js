import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export const BeautyDatetime = ({ showTime = false, datetime }) => {
  const format = {
    true: 'DD.MM.YY HH:mm:ss',
    false: 'DD.MM.YY',
  };

  return (
    datetime && <Moment format={format[showTime.toString()]}>{datetime}</Moment>
  );
};

BeautyDatetime.propTypes = {
  showTime: PropTypes.bool,
  datetime: PropTypes.string.isRequired,
};
