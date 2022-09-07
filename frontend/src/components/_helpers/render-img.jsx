import React from "react";
import PropTypes from 'prop-types';

export const RenderImg = ({src = null, alt = '', className = '', style=''}) => (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
)
RenderImg.propTypes = {
  input: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};