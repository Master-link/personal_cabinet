import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../_helpers/StyledTableRow';
import { StyledTableCell } from '../_helpers/StyledTableCell';

export const Tr = ({ id, login, smpp_address_uri }) => (
  <StyledTableRow hover>
    <StyledTableCell align="left">
      <span>{id}</span>
    </StyledTableCell>
    <StyledTableCell align="left">{login}</StyledTableCell>
    <StyledTableCell align="left">
      {smpp_address_uri}
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  smpp_address_uri: PropTypes.string.isRequired,
};
