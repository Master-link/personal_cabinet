import React from 'react';
import { FormattedMessage } from 'react-intl';
import './beauty-money-format.style.scss';

const DocumentType = ({ type }) => {
  switch (type) {
    case 'sms_service_act':
      return (
        <FormattedMessage id="act" defaultMessage="Act" />
      );
    case 'sms_service_invoice':
      return (
        <FormattedMessage
          id="invoice"
          defaultMessage="Invoice"
        />
      );
    case 'periodic_fortnight':
      return (
        <FormattedMessage
          id="invoice"
          defaultMessage="Invoice"
        />
      );
    default:
      return <>{type}</>;
  }
};

export default DocumentType;
