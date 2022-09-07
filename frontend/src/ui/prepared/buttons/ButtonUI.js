import React from 'react';
import Button from '@material-ui/core/Button';
import * as PropTypes from 'prop-types';

export const ButtonUI = ({
  onClick = () => {},
  color = 'primary',
  text = 'text',
  disabled = false,
  className = '',
  variant = 'contained',
  size = 'medium',
  type = 'button',
}) => (
  <Button
    type={type}
    className={className}
    variant={variant}
    color={color}
    onClick={onClick}
    disabled={disabled}
    size={size}
  >
    {text}
  </Button>
);

ButtonUI.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};
