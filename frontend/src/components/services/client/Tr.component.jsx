import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { messageI18n } from 'src/services/intl/intl';
import { ACTIVE } from 'src/constants/subscriptions';
import { BeautyDatetime } from 'src/utilities/beauty-datetime.utility';
import BeautyMoneyFormat from 'src/utilities/beauty-money-format.utility';
import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';

const renderExpiredSubscribe = (ended_at) => {
  if (ended_at)
    return <BeautyDatetime datetime={ended_at} />;

  return <AllInclusiveIcon />;
};

const expiredSubscription = (kind, subscriptions) => {
  const aciveSubscriptions =
    subscriptions.filter(
      (subscription) => subscription.state === ACTIVE,
    ) || null;

  if (aciveSubscriptions.length === 0) return <>-</>;

  return (
    <>
      {aciveSubscriptions.map((subscription, index) => (
        <div key={index}>
          <BeautyDatetime
            datetime={subscription.created_at}
          />
          {' - '}
          {renderExpiredSubscribe(subscription.ended_at)}
        </div>
      ))}
    </>
  );
};

export const Tr = ({ data, onClick }) => (
  <StyledTableRow
    hover
    onClick={onClick}
    className="pointer"
  >
    <StyledTableCell align="left">
      <span>{data.name}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>
        <BeautyMoneyFormat
          money={data.service_balances[0].balance}
          fmt={data.currency.fmt}
          iso4217_code={data.currency.iso4217_code}
        />
      </span>
    </StyledTableCell>
    <StyledTableCell align="left">
      {expiredSubscription(data.kind, data.subscriptions)}
    </StyledTableCell>
    <StyledTableCell align="left">
      <span className="center">
        {data.subscriptions.length} /
        {
          data.subscriptions.filter(
            (subscription) => subscription.state == ACTIVE,
          ).length
        }
      </span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span>{messageI18n('yes', 'Yes')}</span>
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    currency: PropTypes.shape({
      iso4217_code: PropTypes.string.isRequired,
      fmt: PropTypes.string.isRequired,
    }).isRequired,
    service_balances: PropTypes.arrayOf(
      PropTypes.shape({
        balance: PropTypes.string.isRequired,
      }),
    ).isRequired,
    subscriptions: PropTypes.arrayOf(
      PropTypes.shape({
        state: PropTypes.string.isRequired,
        created_at: PropTypes.string,
        ended_at: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
