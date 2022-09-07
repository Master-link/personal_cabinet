import React from 'react';
import * as PropTypes from 'prop-types';

export const RenderTableRow = ({ title, value }) => (
  <tr>
    <th>{title}</th>
    <td>{value}</td>
  </tr>
);

RenderTableRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.func.isRequired,
};
