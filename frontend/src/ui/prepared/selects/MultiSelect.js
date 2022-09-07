import React from 'react';
import * as PropTypes from 'prop-types';
import ReactSelectMaterialUi from 'react-select-material-ui';

export const MultiSelect = ({
  handleChange = () => {},
  options = [],
  values = [],
  className = '',
}) => (
  <ReactSelectMaterialUi
    className={className}
    values={values}
    options={options}
    onChange={handleChange}
  />
);

MultiSelect.propTypes = {
  options: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
};
