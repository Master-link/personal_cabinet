import React from 'react';
import {FormattedMessage} from 'react-intl';
import './beauty-money-format.style.scss';


const SmsStatusFormat = ({status}) => {

  switch(status) {
    case 'delivered':
        return (<FormattedMessage id="delivered" defaultMessage="delivered" />);
    case 'expired':
      return (<FormattedMessage id="expired" defaultMessage="expired" />);
    case 'incoming':
      return (<FormattedMessage id="incoming" defaultMessage="incoming" />);
    case 'rejected':
      return (<FormattedMessage id="rejected" defaultMessage="rejected" />);
    case 'undeliverable':
      return (<FormattedMessage id="undeliverable" defaultMessage="undeliverable" />);
    default:
      return (<>{status}</>);
    }
}

export default SmsStatusFormat;