import { useEffect, useState } from 'react';
import { default as TransactionsIndex } from 'src/components/transactions/mainPage/TransactionIndex.component';
import Subscriptions from '../subscriptions.component';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import Myspinner from 'src/components/share/myspinner.component';
import { getClient } from 'src/services/client-http.service';
import { getService } from 'src/services/service-http.service';
import { getRegisteredPaymentSystems } from 'src/services/subscription-http.service';
import { clientHasActiveSubscribesByService } from '../clientHasActiveSubscribesByService';
import { Box, Tab, Tabs } from '@material-ui/core';
import { a11yProps } from '../../features/a11y-full-props';
import { TabPanel } from '../../features/tab-panel.component';

const tabsIndexesMap = {
  subscriptions: 0,
  transactions: 1,
};

const SubscriptionsTabs = () => {
  const {
    client_id,
    action,
    subaction,
    subaction_id,
    id,
    subcontroller,
  } = useParams();
  const [disabledClient, setDisabledClient] =
    useState(false);
  const [disabledService, setDisabledService] =
    useState(false);
  const [hasActiveSubscribes, setHasActiveSubscribes] =
    useState(false);
  const history = useHistory();
  const [client, setClient] = useState();
  const [service, setService] = useState();
  const [balance, setBalance] = useState(1000);
  const [clientPaySystems, setClientPaySystems] =
    useState(false);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchService = async (id = 0) => {
    setDisabledService(false);
    await getService(id)
      .then((response) => {
        setService(response.data.service);
      })
      .then(() => {
        setDisabledService(true);
      });
  };

  // получить клиента
  const fetchClient = async (id = 0) => {
    return await getClient(id).then((response) => {
      setDisabledClient(true);
      return response.data.client;
    });
  };

  useEffect(async () => {
    try {
      const response = await fetchClient(client_id);
      setClient(response);
    } catch (e) {}

    try {
      await fetchService(id);
    } catch (e) {}
  }, []);

  useEffect(async () => {
    if (subcontroller === 'payment_gate') {
      try {
        const { data } = await getRegisteredPaymentSystems(
          client_id,
        );
        setClientPaySystems(data);
      } catch (e) {}
    }
    const activeSubscribes =
      await clientHasActiveSubscribesByService(
        client_id,
        id,
      );
    setHasActiveSubscribes(activeSubscribes > 0);
  }, [subcontroller]);

  const handleSelect = (key) => {
    history.push(
      `/clients/show/${client_id}/services/show/${id}/${key}`,
    );
  };

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
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab
          onClick={() =>
            history.push(
              `/clients/show/${client_id}/services/show/${id}/subscriptions`,
            )
          }
          label={
            <FormattedMessage
              id="subscribes"
              defaultMessage="Subscribes"
            />
          }
          {...a11yProps(0)}
        />
        <Tab
          onClick={() =>
            history.push(
              `/clients/show/${client_id}/services/show/${id}/transactions`,
            )
          }
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

export default SubscriptionsTabs;
