import Moment from 'react-moment';
import BeautyMoneyFormat from '../../../utilities/beauty-money-format.utility';
import BeautySourceFormat from '../../../utilities/beauty-source-format.utility';
import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';

export const Tr = ({
  client,
  detail,
  money,
  onClick,
  service,
  source,
  updated_at,
}) => (
  <StyledTableRow hover onClick={onClick}>
    <StyledTableCell align="left" className="grided_cell">
      <span>{service.name}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{client.crm}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{client.name}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>
        <Moment format="DD.MM.YYYY HH:mm">
          {updated_at}
        </Moment>
      </span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>
        <BeautyMoneyFormat
          money={money}
          fmt={service.currency.fmt}
          iso4217_code={service.currency.iso4217_code}
        />
      </span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{detail.count_sms || '—'}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{detail.document_number || '—'}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>
        <BeautySourceFormat source={source} />
      </span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{detail.info || '—'}</span>
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  client: PropTypes.shape({
    crm: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  detail: PropTypes.shape({
    count_sms: PropTypes.string.isRequired,
    document_number: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
  money: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currency: PropTypes.shape({
      fmt: PropTypes.string.isRequired,
      iso4217_code: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  source: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
};
