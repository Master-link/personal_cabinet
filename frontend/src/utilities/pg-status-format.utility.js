import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import './beauty-money-format.style.scss';

export const PgStatusFormat = ({ status }) => {
  switch (status) {
    case 'created':
      return (
        <FormattedMessage id="pgstatus.created" defaultMessage="Created" />
      );
    case 'pending':
      return (
        <FormattedMessage id="pgstatus.pending" defaultMessage="Pending" />
      );
    case 'waiting_confirm':
      return (
        <FormattedMessage
          id="pgstatus.waiting_confirm"
          defaultMessage="Waiting confirm"
        />
      );
    case 'waiting_order_end':
      return (
        <FormattedMessage
          id="pgstatus.waiting_order_end"
          defaultMessage="Waiting order end"
        />
      );
    case 'holded':
      return <FormattedMessage id="pgstatus.holded" defaultMessage="Holded" />;
    case 'success':
      return (
        <FormattedMessage id="pgstatus.success" defaultMessage="Success" />
      );
    case 'failed':
      return <FormattedMessage id="pgstatus.fail" defaultMessage="Fail" />;
    case 'cancelled':
      return (
        <FormattedMessage id="pgstatus.cancelled" defaultMessage="Cancelled" />
      );
    default:
      return <>{status}</>;
  }
};

PgStatusFormat.propTypes = {
  status: PropTypes.string.isRequired,
};
