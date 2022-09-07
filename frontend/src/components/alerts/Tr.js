import CheckedActive from 'src/utilities/checked-active.utility';
import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../_helpers/StyledTableRow';
import { StyledTableCell } from '../_helpers/StyledTableCell';

export const Tr = ({
  id,
  name,
  sms_enabled,
  email_enabled,
  onClick,
  inactive,
  state,
}) => (
  <StyledTableRow
    hover
    onClick={() => state === 'enabled' && onClick(id)}
    className={`pointer${inactive}`}
  >
    <StyledTableCell align="left">{name}</StyledTableCell>
    <StyledTableCell align="left">
      <span>
        <CheckedActive status={email_enabled} />
      </span>
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email_enabled: PropTypes.bool.isRequired,
  sms_enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  inactive: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
