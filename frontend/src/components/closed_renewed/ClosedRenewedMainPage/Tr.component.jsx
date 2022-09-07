import * as PropTypes from 'prop-types';
import { BeautyDatetime } from '../../../utilities/beauty-datetime.utility';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';

export const Tr = ({
  closed,
  created_at,
  onClick,
  renewed,
}) => (
  <StyledTableRow
    hover
    onClick={onClick}
    className="pointer"
  >
    <StyledTableCell align="left">{closed}</StyledTableCell>
    <StyledTableCell align="left">
      {renewed}
    </StyledTableCell>
    <StyledTableCell align="left">
      <BeautyDatetime datetime={created_at} showTime />
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  closed: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  renewed: PropTypes.string.isRequired,
};
