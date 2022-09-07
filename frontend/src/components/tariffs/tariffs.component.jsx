import React from 'react';
import IndexForServices from './index-for-services.component';
import FormTariffContainer from './FormTariffContainer.container';
import * as PropTypes from 'prop-types';

const Tariffs = ({ service_id, id, action }) => {
  return (
    <>
      {action === 'create-for-services' && (
        <FormTariffContainer service_id={service_id} />
      )}
      {action === 'index-for-services' && (
        <IndexForServices
          service_id={service_id}
          action={action}
        />
      )}
      {action === 'edit-for-services' && (
        <FormTariffContainer
          service_id={service_id}
          id={id}
        />
      )}
    </>
  );
};

export default Tariffs;

Tariffs.propTypes = {
  service_id: PropTypes.number.isRequired,
  id: PropTypes.number,
  action: PropTypes.string.isRequired,
};
