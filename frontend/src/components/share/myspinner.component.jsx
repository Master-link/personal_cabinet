import React from 'react';
import { useIntl } from 'react-intl';
import LoadingOverlay from 'react-loading-overlay';

const Myspinner = () => {
  const intl = useIntl();

  return (
    <LoadingOverlay
      active={true}
      text={intl.formatMessage({
        id: 'loading_data',
        defaultMessage: 'Loading data ...',
      })}
      className="my_spiner_wrapper"
      spinner={
        <div>
          <img
            src="/Rolling-1s-50px.svg"
            style={{ opacity: 1, visibility: 'visible' }}
            alt=""
          />
        </div>
      }
    />
  );
};

export default Myspinner;
