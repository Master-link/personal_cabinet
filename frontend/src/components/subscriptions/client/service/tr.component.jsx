import { BeautyDatetime } from '../../../../utilities/beauty-datetime.utility';
import '../../../share/share.style.scss';
import BeautyActive from '../../../../utilities/beauty-active.utility';
import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../../_helpers/StyledTableCell';

const Tr = ({
  ended_at,
  inactive,
  onTrClick,
  started_at,
  state,
  tariff_name,
}) => (
  <StyledTableRow
    hover
    onClick={onTrClick}
    className={`pointer${inactive}`}
  >
    <StyledTableCell align="left">
      {tariff_name}
    </StyledTableCell>
    <StyledTableCell align="left">
      <BeautyDatetime datetime={started_at} />
    </StyledTableCell>
    <StyledTableCell align="left">
      <BeautyDatetime datetime={ended_at} />
    </StyledTableCell>
    <StyledTableCell align="left">
      <BeautyActive status={state} />
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  ended_at: PropTypes.string.isRequired,
  inactive: PropTypes.string.isRequired,
  onTrClick: PropTypes.func.isRequired,
  started_at: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  tariff_name: PropTypes.string.isRequired,
};

export default Tr;
