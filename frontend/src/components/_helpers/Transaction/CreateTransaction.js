import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { FormattedMessage, useIntl } from 'react-intl';
import { PermissionsUtility } from 'src/utilities/permissions.utility';
import { CREATE_TRANSACTION } from 'src/constants/permissions';
import { FormTransaction } from 'src/components/_helpers/Transaction/Form/FormTransaction';
import * as PropTypes from 'prop-types';
import {
  getClient,
  getClientService,
  searchClient,
} from 'src/services/client-http.service';

const CreateTransaction = ({
  clientId,
  serviceId,
  afterCreate = () => {},
}) => {
  const intl = useIntl();
  const [clientOption, setClientOption] = useState({});
  const [serviceOption, setServiceOption] = useState({});
  const [showForm, setShowForm] = useState(false);
  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);
  const [client, setClient] = useState({});
  const [currentClient, setCurrentClient] = useState(
    clientId,
  );
  const [service, setService] = useState({});
  const [services, setServices] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);

  const handleChangeClient = async (name) => {
    const {
      data: { data: clients },
    } = await searchClient({
      page: 1,
      name,
    }).catch((error) => console.log(error));
    setClientOptions(clients);
  };

  const fetchClient = async (clientId) => {
    try {
      const {
        data: { client },
      } = await getClient(clientId);
      return client;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const loadServices = async (currentClient) => {
    try {
      const {
        data: { services },
      } = await getClientService(currentClient, {}, {});
      setServices(services);
      return services;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const resetFields = () => {
    if (!clientId) {
      setClient({});
      setClientOption({});
    }
    if (!serviceId) {
      setService({});
      setServiceOption({});
    }
  };

  useEffect(async () => {
    if (currentClient) {
      const { id, name } = await fetchClient(currentClient);
      setClient({ id: id, name: name });
      setClientOption({ id: id, name: name });
      const services = await loadServices(currentClient);
      setServices(services);
    }

    if (serviceId) {
      const services = await loadServices(currentClient);
      const { id, name } = services.find(
        (item) => item.id == serviceId,
      );
      setService({ id: id, name: name });
      setServiceOption({ id: id, name: name });
    }
  }, []);

  useEffect(async () => {
    if (clientOption.id) {
      const services = await loadServices(clientOption.id);
      setServices(services);
    }
  }, [clientOption]);

  if (!PermissionsUtility(CREATE_TRANSACTION)) return null;
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowForm}
      >
        <AddIcon />
        <FormattedMessage
          id="transaction.to_create"
          defaultMessage="Create a transaction"
        />
      </Button>

      {showForm && (
        <FormTransaction
          client={client}
          clientId={clientId}
          clientOption={clientOption}
          clientOptions={clientOptions}
          closePopup={handleCloseForm}
          intl={intl}
          onAfterCreate={afterCreate}
          onChangeClient={setClient}
          onChangeCurrentClient={setCurrentClient}
          onChangeClientName={handleChangeClient}
          onChangeClientOption={setClientOption}
          onChangeServiceOption={setServiceOption}
          resetFields={resetFields}
          service={service}
          serviceId={serviceId}
          serviceOption={serviceOption}
          services={services}
        />
      )}
    </>
  );
};

CreateTransaction.propTypes = {
  clientId: PropTypes.number,
  serviceId: PropTypes.number,
  afterCreate: PropTypes.func,
};

export default CreateTransaction;
