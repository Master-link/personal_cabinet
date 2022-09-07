import * as PropTypes from 'prop-types';

export const claimDataProps = PropTypes.shape({
  serviceData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    agreement_is_link: PropTypes.bool.isRequired,
  }).isRequired,
  tariffData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  tariff: PropTypes.string.isRequired,
  agreement: PropTypes.bool.isRequired,
  serviceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  tariffOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  disabledSubmit: PropTypes.bool.isRequired,
});
