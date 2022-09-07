import { useEffect, useState } from 'react';
import { default as TransactionsIndex } from '../transactions/mainPage/TransactionIndex.component';
import Subscriptions from './subscriptions.component';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import Myspinner from '../share/myspinner.component';
import { getClient } from '../../services/client-http.service';
import { getService } from '../../services/service-http.service';
import { getRegisteredPaymentSystems } from '../../services/subscription-http.service';
import { useHistory } from 'react-router-dom';
import { clientHasActiveSubscribesByService } from './clientHasActiveSubscribesByService';
import { Box, Tabs, Tab } from '@material-ui/core';
import { a11yProps } from '../features/a11y-full-props';
import { TabPanel } from '../features/tab-panel.component';
import * as PropTypes from 'prop-types';

const tabsIndexesMap = {
  subscriptions: 0,
  transactions: 1,
};

const SubscriptionsClientTabs = ({
  client_id,
  action,
  ...props
}) => {
  const history = useHistory();
  const { subaction, subaction_id, id, subcontroller } =
    useParams();
  const [disabledClient, setDisabledClient] =
    useState(false);
  const [disabledService, setDisabledService] =
    useState(false);
  const [hasActiveSubscribes, setHasActiveSubscribes] =
    useState(false);
  const [client, setClient] = useState();
  const [service, setService] = useState();
  const [balance, setBalance] = useState(1000);
  const [clientPaySystems, setClientPaySystems] =
    useState(false);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchClient = async (client_id = 0) => {
    setDisabledClient(false);
    await getClient(client_id)
      .then((response) => {
        setClient(response.data.client);
      })
      .then(() => {
        setDisabledClient(true);
      });
  };

  const fetchService = (id = 0) => {
    setDisabledService(false);
    return getService(id)
      .then((response) => {
        setService(response.data.service);
        return response.data.service;
      })
      .then((service) => {
        setDisabledService(true);
        return service;
      });
  };

  useEffect(() => {
    switch (subcontroller) {
      case 'subscriptions':
        return;
      case 'transactions':
        return;
      default:
        return;
    }
  }, []);

  useEffect(() => {
    async function fetch() {
      await fetchClient(client_id);
      const service = await fetchService(id);

      if (service.ticket.kind === 'payment_gate') {
        try {
          const { data } =
            await getRegisteredPaymentSystems(client_id);
          setClientPaySystems(data);
        } catch (e) {}
      }
      const activeSubscribes =
        await clientHasActiveSubscribesByService(
          client_id,
          id,
        );

      setHasActiveSubscribes(activeSubscribes > 0);
    }
    fetch();
  }, [client_id, id]);

  useEffect(() => {
    setValue(tabsIndexesMap[subcontroller]);
  }, [value]);

  if (!disabledClient || !disabledService) {
    return <Myspinner />;
  }

  return (
    <Box>
      <Tabs
        value={value}
        onClick={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab
          onClick={() => {
            history.push(
              `/services_client/show/${id}/subscriptions`,
            );
          }}
          label={
            <FormattedMessage
              id="subscribes"
              defaultMessage="Subscribes"
            />
          }
          {...a11yProps(0)}
        />
        <Tab
          onClick={() => {
            history.push(
              `/services_client/show/${id}/transactions`,
            );
          }}
          label={
            <FormattedMessage
              id="transactions"
              defaultMessage="Transactions"
            />
          }
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0} dir="x">
        <Subscriptions
          client={client}
          service={service}
          action={action}
          subaction={subaction}
          subaction_id={subaction_id}
          {...props}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir="x">
        {subcontroller === 'transactions' && (
          <TransactionsIndex
            client_id={client_id}
            service_id={id}
            action={action}
          />
        )}
      </TabPanel>
    </Box>
  );
};

SubscriptionsClientTabs.propTypes = {
  client_id: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default SubscriptionsClientTabs;
