import React, { useState, useEffect } from 'react';
import { CreateDocument } from './CreateDocument';
import { useIntl } from 'react-intl';
import {
  getClient,
  getClientService,
  searchClient,
} from '../../../services/client-http.service';
import { searchAvailableTariffs } from '../../../services/tariff-http.service';
import * as PropTypes from 'prop-types';
import { postDocument } from '../../../services/document-http.service';
import SnackbarUtils from '../../../utilities/SnackbarUtils';
import { messageI18n } from '../../../services/intl/intl';

const CreateDocumentContainer = ({
  afterCreateDocument,
  clientId,
  onClosePopup,
}) => {
  const intl = useIntl();
  const [client, setClient] = useState({});
  const [currentClient, setCurrentClient] = useState(
    clientId,
  );
  const [tariffs, setTariffs] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceOption, setServiceOption] = useState({});
  const [clientOption, setClientOption] = useState({});
  const [clientOptions, setClientOptions] = useState([]);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(
    false,
  );

  const fetchClient = async (client_id) => {
    try {
      const {
        data: { client },
      } = await getClient(client_id);
      return client;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const handleChangeClient = async (name) => {
    const {
      data: { data: clients },
    } = await searchClient({
      page: 1,
      name,
    }).catch((error) => console.log(error));
    setClientOptions(clients);
  };

  const loadServices = async (currentClient) => {
    try {
      const {
        data: { services },
      } = await getClientService(currentClient, {}, {});
      return services;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const loadTariffs = async (clientId, serviceId) => {
    try {
      const {
        data: { data },
      } = await searchAvailableTariffs(clientId, serviceId);

      return data.map(({ id, name }) => {
        return { id: id, name: name };
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const postData = async (data) => {
    try {
      setIsDisabledSubmit(true);
      await postDocument(
        '/documents',
        data,
      );
      SnackbarUtils.success(
        messageI18n('save_success', 'Successfully saving'),
      );
      await afterCreateDocument();
    } catch (e) {
      SnackbarUtils.error(
        messageI18n(
          'send_error',
          'An Error on sending data',
        ),
      );
      console.error(e);
    } finally {
      setIsDisabledSubmit(false);
      onClosePopup();
    }
  };

  useEffect(async () => {
    if (clientId) {
      const { id, name } = await fetchClient(clientId);
      setClientOption({ id: id, name: name });
      setClient({ id: id, name: name });
    }
  }, [clientId]);

  useEffect(async () => {
    if (clientOption.id) {
      const services = await loadServices(clientOption.id);
      setServices(services);
    }
  }, [clientOption]);

  useEffect(async () => {
    if (serviceOption.id) {
      const tariffs = await loadTariffs(
        clientOption.id,
        serviceOption.id,
      );
      setTariffs(tariffs);
    }
  }, [serviceOption]);

  return (
    <CreateDocument
      client={client}
      clientId={clientId}
      clientOption={clientOption}
      clientOptions={clientOptions}
      currentClient={currentClient}
      initialValues={{ client_id: currentClient }}
      intl={intl}
      isDisabledSubmit={isDisabledSubmit}
      onChangeClient={setClient}
      onChangeClientName={handleChangeClient}
      onChangeClientOption={setClientOption}
      onChangeCurrentClient={setCurrentClient}
      onChangeServiceOption={setServiceOption}
      onClosePopup={onClosePopup}
      onSubmitForm={(values) => postData(values)}
      serviceOption={serviceOption}
      services={services}
      tariffs={tariffs}
    />
  );
};

CreateDocumentContainer.propTypes = {
  afterCreateDocument: PropTypes.func.isRequired,
  clientId: PropTypes.string,
  onClosePopup: PropTypes.func.isRequired,
};

export default CreateDocumentContainer;
