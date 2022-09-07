import * as PropTypes from 'prop-types';
import { trAdminPageClick } from '../index';
import BeautyActive from 'src/utilities/beauty-active.utility';
import { NEW } from 'src/constants/subscriptions';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';

const conditionOnClick = (
  clientId,
  serviceId,
  tariffId,
  id,
  state,
  history,
) => {
  if (state === NEW)
    history.push(
      trAdminPageClick(
        clientId,
        serviceId,
        tariffId,
        id,
      ).toString(),
    );
};

const TrClaims = ({
  id,
  client,
  clientId,
  service,
  tariff,
  state,
  comment,
  history,
  serviceId,
  tariffId,
}) => (
  <StyledTableRow
    hover
    onClick={() =>
      conditionOnClick(
        clientId,
        serviceId,
        tariffId,
        id,
        state,
        history,
      )
    }
  >
    <StyledTableCell align="left">{client}</StyledTableCell>
    <StyledTableCell align="left">
      <span>{comment}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      {service}
    </StyledTableCell>
    <StyledTableCell align="left">{tariff}</StyledTableCell>
    <StyledTableCell align="left">
      <BeautyActive status={state} />
    </StyledTableCell>
  </StyledTableRow>
);

export default TrClaims;

TrClaims.propTypes = {
  id: PropTypes.number.isRequired,
  client: PropTypes.string.isRequired,
  clientId: PropTypes.number.isRequired,
  comment: PropTypes.string,
  service: PropTypes.string.isRequired,
  tariff: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  serviceId: PropTypes.number.isRequired,
  tariffId: PropTypes.number.isRequired,
};
