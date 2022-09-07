import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button as ButtonUI } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '0px',
  },
}));

export const Button = ({
  onClick = () => {},
  text = 'Button',
  className = '',
}) => {
  const classes = useStyles();

  return (
    <ButtonUI
      onClick={onClick}
      color="primary"
      variant="contained"
      className={`${classes.formControl} ${className}`}
    >
      {text}
    </ButtonUI>
  );
};

Button.propTypes = {
  handleDateChange: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string,
};
