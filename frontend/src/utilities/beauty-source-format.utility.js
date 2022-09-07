import React from 'react';
import { FormattedMessage } from 'react-intl';
import './beauty-money-format.style.scss';

const BeautySourceFormat = ({ source }) => {
  switch (source) {
    case 'source_sms':
      return <>SMS</>;
    case 'source_1c':
      return <>1C</>;
    case 'source_api':
      return (
        <FormattedMessage
          id="lk"
          defaultMessage="Personal Cabinet"
        />
      );
    case 'source_advance_payment':
      return (
        <FormattedMessage
          id="advance_payment"
          defaultMessage="Advance Payment"
        />
      );
    case 'source_calls_bot':
      return (
        <FormattedMessage
          id="callbot"
          defaultMessage="Call Bot"
        />
      );
    default:
      return <>{source}</>;
  }
};

export default BeautySourceFormat;
