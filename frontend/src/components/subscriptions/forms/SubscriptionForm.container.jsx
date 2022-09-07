import React, { useEffect, useState } from 'react';
import {
  getService,
  getServicesForClient,
} from 'src/services/service-http.service';
import { getTariffesForService } from 'src/services/tariff-http.service';
import { useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import SubscriptionForm from './SubscriptionForm';
import Myspinner from '../../share/myspinner.component';
import { putAutoContinueActivation } from '../../../services/subscription-http.service';

const virtualField = (stateValue) => {
  return stateValue === 'state_continue';
};

const SubscriptionFormContainer = ({
  approvingClaim,
  claimId,
  claimServiceOption = {},
  claimTariff,
  claimTariffOption = {},
  client_id,
  crm,
  initialValues,
  isClaimOnReview,
  readOnly,
}) => {
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const [loaded, setLoaded] = useState(true);

  const [setupValues, setSetupValues] = useState({
    service_id: {},
    ...initialValues,
  });

  const [serviceOptions, setServiceOptions] = useState([]);
  const [serviceOption, setServiceOption] = useState(
    claimServiceOption,
  );
  const [serviceName, setServiceName] = useState('');
  const [service, setService] = useState(null);

  const [tariffOptions, setTariffOptions] = useState([]);
  const [tariffOption, setTariffOption] = useState(
    claimTariffOption,
  );
  const [tariff, setTariff] = useState(claimTariff);

  const fetchService = async (id) => {
    try {
      return await getService(id);
    } catch (e) {
      console.error(e);
    }
  };

  const changeAutoContinueActivation = async () => {
    setLoaded(false);
    try {
      const {
        data: { state },
      } = await putAutoContinueActivation(
        initialValues.id,
        client_id,
      );
      setSetupValues({
        ...setupValues,
        ...{
          continue_subscription: virtualField(state),
        },
        ...{ state: state },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const clearService = (form) => {
    form.reset();
    form.change('service_id', null);
    setTariffOption({});
    setTariff(null);
  };
  const clearTariff = (form) => {
    form.reset();
    form.change('service_id', serviceOption);
    setTariffOption({});
    setTariff(null);
  };

  const loadOptions = async () => {
    try {
      setLoaded(false);
      const {
        data: { service },
      } = await fetchService(serviceOption.id);
      setService(service);
      const {
        data: { data },
      } = await getTariffesForService({
        name: '',
        service_id: service.id,
      });
      setTariffOptions(data);
    } catch (e) {
    } finally {
      setLoaded(true);
    }
  };

  useEffect(async () => {
    try {
      setDisabled(true);
      const {
        data: { data },
      } = await getServicesForClient({
        name: serviceName,
        client_id: client_id,
      });
      setServiceOptions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(false);
    }
  }, [serviceName]);

  useEffect(() => {
    if (serviceOption.id) {
      loadOptions();
    } else {
      setService(null);
    }
  }, [serviceOption]);

  useEffect(async () => {
    if (initialValues.id) {
      setSetupValues({
        ...setupValues,
        ...{
          continue_subscription: virtualField(
            initialValues.state,
          ),
        },
      });
      setServiceOption({
        id: initialValues.tariff.service.id,
        name: initialValues.tariff.service.name,
      });
      setTariffOption({
        id: initialValues.tariff.id,
        name: initialValues.tariff.name,
      });
      setService(initialValues.service);
      setTariff(initialValues.tariff);
    }
  }, []);

  if (!loaded) {
    return <Myspinner />;
  }

  return (
    <SubscriptionForm
      claimId={claimId}
      clearService={clearService}
      clearTariff={clearTariff}
      client_id={client_id}
      crm={crm}
      disabled={disabled}
      history={history}
      service={service}
      serviceOption={serviceOption}
      serviceOptions={serviceOptions}
      setServiceName={setServiceName}
      setServiceOption={setServiceOption}
      setTariff={setTariff}
      setTariffOption={setTariffOption}
      setupValues={setupValues}
      tariff={tariff}
      tariffOption={tariffOption}
      tariffOptions={tariffOptions}
      readOnly={readOnly || []}
      isClaimOnReview={isClaimOnReview}
      approvingClaim={approvingClaim}
      changeAutoContinueActivation={
        changeAutoContinueActivation
      }
    />
  );
};

SubscriptionFormContainer.propTypes = {
  approvingClaim: PropTypes.func.isRequired,
  claimId: PropTypes.number.isRequired,
  claimServiceOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  claimTariff: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  claimTariffOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  client_id: PropTypes.number.isRequired,
  crm: PropTypes.number.isRequired,
  initialValue: PropTypes.object.isRequired,
  isClaimOnReview: PropTypes.bool.isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SubscriptionFormContainer;
