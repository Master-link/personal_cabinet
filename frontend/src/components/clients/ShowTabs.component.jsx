import Edit from './edit.component';
import Transactions from '../transactions/transactions.component';
import Services from '../services/services.component';
import Users from '../users/users.component';
import DocumentsTab from '../documents/documentsTab/DocumentsTab.component';
import AlertsIndex from '../alerts/AlertsIndex';
import { Box, Tabs, Tab } from '@material-ui/core';
import { TabPanel } from '../features/tab-panel.component';
import { a11yProps } from '../features/a11y-full-props';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';

const mapTab = {
  clients: 0,
  services: 1,
  transactions: 2,
  documents: 3,
  users: 4,
  alerts: 5,
};

const ShowTabs = ({
  client_id,
  controller,
  action,
  id,
  subcontroller,
}) => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(mapTab[controller]);
  }, []);

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
            history.push(`/clients/edit/${client_id}`)
          }
          label={
            <FormattedMessage
              id="information"
              defaultMessage="Information"
            />
          }
          {...a11yProps(0)}
        />
        <Tab
          onClick={() =>
            history.push(
              `/clients/show/${client_id}/services`,
            )
          }
          label={
            <FormattedMessage
              id="services"
              defaultMessage="Services"
            />
          }
          {...a11yProps(1)}
        />
        <Tab
          onClick={() =>
            history.push(
              `/clients/show/${client_id}/transactions`,
            )
          }
          label={
            <FormattedMessage
              id="transactions"
              defaultMessage="Transactions"
            />
          }
          {...a11yProps(2)}
        />
        <Tab
          onClick={() =>
            history.push(
              `/clients/show/${client_id}/documents`,
            )
          }
          label={
            <FormattedMessage
              id="documents"
              defaultMessage="Documents"
            />
          }
          {...a11yProps(3)}
        />
        <Tab
          onClick={() =>
            history.push(`/clients/show/${client_id}/users`)
          }
          label={
            <FormattedMessage
              id="users"
              defaultMessage="Users"
            />
          }
          {...a11yProps(4)}
        />
        <Tab
          onClick={() =>
            history.push(
              `/clients/show/${client_id}/alerts`,
            )
          }
          label={
            <FormattedMessage
              id="notifications"
              defaultMessage="Notifications"
            />
          }
          {...a11yProps(5)}
        />
      </Tabs>
      <TabPanel value={value} index={0} dir="x">
        {controller === 'clients' && (
          <>
            {action === 'edit' && <Edit id={client_id} />}
          </>
        )}
      </TabPanel>
      <TabPanel value={value} index={1} dir="x">
        {controller === 'services' && (
          <Services
            controller={controller}
            action={action}
            id={id}
            client_id={client_id}
            subcontroller={subcontroller}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={2} dir="x">
        {controller === 'transactions' && (
          <Transactions
            action={action}
            client_id={client_id}
            id={id}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={3} dir="x">
        {controller === 'documents' && (
          <DocumentsTab client_id={client_id} />
        )}
      </TabPanel>
      <TabPanel value={value} index={4} dir="x">
        {controller === 'users' && (
          <Users
            action={action}
            client_id={client_id}
            id={id}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={5} dir="x">
        {controller === 'alerts' && (
          <AlertsIndex client_id={client_id} />
        )}
      </TabPanel>
    </Box>
  );
};

ShowTabs.propTypes = {
  client_id: PropTypes.string.isRequired,
  controller: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  crm_id: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  subcontroller: PropTypes.string.isRequired,
};

export default ShowTabs;
