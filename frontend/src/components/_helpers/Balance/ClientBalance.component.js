import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { setFullBalance } from 'src/redux/balance/balance.actions';
import 'src/components/share/share.style.scss';
import { InputField } from 'src/ui/prepared/inputs';
import cn from 'classnames';
import './balance.style.scss';
import { InputAdornment } from '@material-ui/core';
import { checkPositiveBalance } from './ballanceSign';
import { ActionCable } from 'actioncable-client-react';

const ClientBalance = ({
  client_id,
  service_id,
  setFullBalance,
  fullBalance,
}) => {
  const intl = useIntl();

  const handleReceived = ({ balances }) =>
    setFullBalance(
      balances.find(
        (balance) =>
          balance.service_id === parseInt(service_id),
      ),
    );

  return (
    <>
      <ActionCable
        channel="BalanceChannel"
        room={client_id}
        onReceived={handleReceived}
      />
      <InputField
        key={fullBalance.balance}
        label={intl.formatMessage({
          id: 'balance',
          defaultMessage: 'Balance',
        })}
        id="balance_id"
        defaultValue={fullBalance.balance.toLocaleString(
          'ru',
        )}
        variant="outlined"
        className={cn(
          'balance',
          checkPositiveBalance(fullBalance.balance),
        )}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position={'end'}>
              <span
                className={checkPositiveBalance(
                  fullBalance.balance,
                )}
                dangerouslySetInnerHTML={{
                  __html: fullBalance.decimal_code,
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fullBalance: state.balances.fullBalance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFullBalance: (data) =>
      dispatch(setFullBalance(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientBalance);

ClientBalance.propTypes = {
  balance: PropTypes.number.isRequired,
  balance_name: PropTypes.string.isRequired,
  client_id: PropTypes.string.isRequired,
  decimal_code: PropTypes.string.isRequired,
  fmt: PropTypes.string.isRequired,
  fullBalance: PropTypes.shape({
    hexadecimal_code: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    iso4217_code: PropTypes.string.isRequired,
    service_id: PropTypes.string.isRequired,
    service_name: PropTypes.string.isRequired,
    setFullBalance: PropTypes.func,
    unicode_code: PropTypes.string.isRequired,
  }).isRequired,
};
