import React from 'react';
import { BeautyDatetime } from '../../../../utilities/beauty-datetime.utility';
import '../../../share/share.style.scss';
import BeautyActive from '../../../../utilities/beauty-active.utility';
import { CLOSED } from '../../../../constants/subscriptions';
import * as PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { StyledTableCell } from '../../../_helpers/StyledTableCell';
import { StyledTableRow } from '../../../_helpers/StyledTableRow';

const TrClientClient = ({ data, onTrClick }) => {
  const inactive = data.state === CLOSED ? ' inactive' : '';

  return (
    <StyledTableRow
      hover
      className={`pointer${inactive}`}
      onClick={onTrClick}
    >
      <StyledTableCell align="left">
        {data.tariff.name}{' '}
        {data.jsondata.new_tariff && (
          <FormattedMessage
            id="level_sla"
            defaultMessage=" Level SLA - {sla}"
            values={{
              sla: `${data.jsondata.new_tariff_slas}`,
            }}
          />
        )}
      </StyledTableCell>
      <StyledTableCell align="left">
        <BeautyDatetime datetime={data.started_at} />
      </StyledTableCell>
      <StyledTableCell align="left">
        <BeautyDatetime datetime={data.ended_at} />
      </StyledTableCell>
      <StyledTableCell align="left">
        <BeautyActive status={data.state} />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TrClientClient;

TrClientClient.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.string.isRequired,
      started_at: PropTypes.string.isRequired,
      ended_at: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tariff: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  onTrClick: PropTypes.object.isRequired,
};
