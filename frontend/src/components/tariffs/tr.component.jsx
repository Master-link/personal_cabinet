import { BeautyDatetime } from 'src/utilities/beauty-datetime.utility';
import { numberFormat } from 'src/utilities/money-format.utility';
import TypesPeriods from 'src/utilities/types-periods.utility';
import TariffsPeriods from 'src/utilities/tariffs-periods.utility';
import * as PropTypes from 'prop-types';
import 'src/components/share/share.style.scss';
import { StyledTableRow } from '../_helpers/StyledTableRow';
import { StyledTableCell } from '../_helpers/StyledTableCell';

const Tr = ({ data, service_id, history }) => {
  const inactive = data.state ? ' inactive' : '';
  return (
    <StyledTableRow
      hover
      className={`pointer${inactive}`}
      onClick={() => {
        history.push(
          `/services/show/${service_id}/tariffs/edit/${data.id}`,
        );
      }}
    >
      <StyledTableCell align="left">
        <span>{data.name}</span>
      </StyledTableCell>
      <StyledTableCell align="left">
        <span>
          <TypesPeriods type={data.kind} />
        </span>
      </StyledTableCell>
      <StyledTableCell align="left">
        <span>
          <TariffsPeriods type={data.duration_kind} />
        </span>
      </StyledTableCell>
      <StyledTableCell align="left">
        <span>
          {numberFormat(
            data.advance_payment,
            data.service.currency.fmt,
            data.service.currency.iso4217_code,
          )}
        </span>
      </StyledTableCell>
      <StyledTableCell align="left">-</StyledTableCell>
      <StyledTableCell align="left">
        <span>
          <BeautyDatetime datetime={data.started_at} />
        </span>
      </StyledTableCell>
      <StyledTableCell align="left">
        <span>
          <BeautyDatetime datetime={data.ended_at} />
        </span>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default Tr;

Tr.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      kind: PropTypes.string.isRequired,
      duration_kind: PropTypes.string.isRequired,
      started_at: PropTypes.string.isRequired,
      ended_at: PropTypes.number.isRequired,
      advance_payment: PropTypes.string.isRequired,
      currency: PropTypes.shape({
        fmt: PropTypes.string.isRequired,
        iso4217_code: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  service_id: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
};
