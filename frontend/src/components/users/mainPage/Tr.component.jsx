import Role from '../../../utilities/role.utility';
import * as PropTypes from 'prop-types';
import { StyledTableCell } from '../../_helpers/StyledTableCell';
import { StyledTableRow } from '../../_helpers/StyledTableRow';

export const Tr = ({
  crm,
  login,
  name,
  email,
  roles,
  onClickTr,
}) => (
  <StyledTableRow hover onClick={onClickTr}>
    <StyledTableCell align="left">
      {crm || '-'}
    </StyledTableCell>
    <StyledTableCell align="left">{login}</StyledTableCell>
    <StyledTableCell align="left">{name}</StyledTableCell>
    <StyledTableCell align="left">{email}</StyledTableCell>
    <StyledTableCell align="left">
      <Role userRoles={roles} />
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  crm: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClickTr: PropTypes.func.isRequired,
};
