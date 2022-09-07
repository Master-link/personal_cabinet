import Role from '../../../utilities/role.utility';
import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';

export const Tr = ({
  email,
  name,
  onClickTr,
  phone_number,
  roles,
}) => (
  <StyledTableRow hover onClick={onClickTr}>
    <StyledTableCell align="left">
      <span>{name}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{email}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{phone_number}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{roles && <Role userRoles={roles} />}</span>
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone_number: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClickTr: PropTypes.func.isRequired,
};
