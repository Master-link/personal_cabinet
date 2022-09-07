import * as PropTypes from 'prop-types';

export const paginationProps = PropTypes.shape({
  component: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rowsPerPageOptions: PropTypes.array.isRequired,
}).isRequired;
