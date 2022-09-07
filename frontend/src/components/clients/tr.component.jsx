import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../_helpers/StyledTableRow';
import { StyledTableCell } from '../_helpers/StyledTableCell';

const LIMIT_HOURS = 10000;

const renderTechnicalSupportTime = (minutes) => {
  if (minutes) {
    const sign = minutes < 0 ? '-' : '';
    const hoursFromMinutes = Math.abs(minutes) / 60;
    const hoursInteger = Math.floor(hoursFromMinutes);
    const minutesFromMinutes =
      (hoursFromMinutes - hoursInteger) * 60;
    const minutesInteger = Math.round(minutesFromMinutes);
    const outputTime = `${sign}${hoursInteger}/${minutesInteger}`;

    const overDay =
      hoursInteger > LIMIT_HOURS
        ? `> ${outputTime}`
        : outputTime;
    return overDay;
  }

  return '-';
};

export const Tr = ({ data, onClickTr }) => {
  return (
    <StyledTableRow
      hover
      onClick={onClickTr}
      className="pointer"
    >
      <StyledTableCell align="left">
        <span>
          {data.crm !== null && data.crm !== undefined
            ? data.crm.crm
            : ''}
        </span>
      </StyledTableCell>
      <StyledTableCell align="left">
        {data.name}{' '}
        <span className="small">
          [{data.count_subscriptions}]
        </span>
      </StyledTableCell>
      <StyledTableCell align="left">
        <span>{data.email}</span>
      </StyledTableCell>
      <StyledTableCell align="left">
        <span>{data.organization}</span>
      </StyledTableCell>
    </StyledTableRow>
  );
};

Tr.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      crm: PropTypes.shape({
        crm: PropTypes.string.isRequired,
      }).isRequired,
      count_subscriptions: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      organization: PropTypes.string.isRequired,
      tehsupport_hours: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClickTr: PropTypes.object.isRequired,
};
