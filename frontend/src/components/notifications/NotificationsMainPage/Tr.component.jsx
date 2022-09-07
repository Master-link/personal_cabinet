import '../../../components/share/share.style.scss';
import * as PropTypes from 'prop-types';
import { BeautyDatetime } from '../../../utilities/beauty-datetime.utility';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';

export const Tr = ({
  categoryTitle,
  created_at,
  isReadMessage,
  message,
  onClick,
}) => (
  <StyledTableRow hover onClick={onClick}>
    <StyledTableCell align="left">
      {categoryTitle}
    </StyledTableCell>
    <StyledTableCell align="left">
      <span className={!isReadMessage && 'bold'}>
        {message}
      </span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <BeautyDatetime datetime={created_at} showTime />
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  isReadMessage: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
