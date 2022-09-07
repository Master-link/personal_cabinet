import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';
import PropTypes from 'prop-types';
import { BeautyDatetime } from '../../../utilities/beauty-datetime.utility';

export const Tr = ({
  finished_at,
  id,
  result,
  setCurrentState,
  setShowDialogActionChoose,
  started_at,
  state,
}) => (
  <StyledTableRow
    hover
    onClick={() => {
      setShowDialogActionChoose(id);
      setCurrentState(state);
    }}
  >
    <StyledTableCell align="left">{result}</StyledTableCell>
    <StyledTableCell align="left">
      <BeautyDatetime
        datetime={started_at}
        showTime={false}
      />
    </StyledTableCell>
    <StyledTableCell align="left">
      {finished_at ? (
        <BeautyDatetime
          datetime={finished_at}
          showTime={false}
        />
      ) : (
        <>-</>
      )}
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  finished_at: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  setCurrentState: PropTypes.func.isRequired,
  setShowDialogActionChoose: PropTypes.func.isRequired,
  started_at: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
