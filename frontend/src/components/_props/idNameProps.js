import * as PropTypes from 'prop-types';

export const idNameProps = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}).isRequired;
