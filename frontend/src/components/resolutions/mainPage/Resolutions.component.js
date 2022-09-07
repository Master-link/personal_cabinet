import React, { useEffect, useState } from 'react';
import { breadcrumbsResolution } from './breadcrumbsResolution';
import { Box, Tab, Tabs } from '@material-ui/core';
import { a11yProps } from '../../features/a11y-full-props';
import RoleResolutionComponent from '../roleResolution/RoleResolution.component';
import { useDispatch } from 'react-redux';
import { TabPanel } from '../../features/tab-panel.component';
import { useIntl } from 'react-intl';

const mainRoles = [
  {
    id: 'permissions.for_managers',
    defaultMessage: 'Permissions for managers',
    role: 'manager',
  },
  {
    id: 'permissions.for_observers',
    defaultMessage: 'Permissions for observers',
    role: 'observer',
  },
  {
    id: 'permissions.for_directors',
    defaultMessage: 'Permissions for directors',
    role: 'director',
  },
  {
    id: 'permissions.for_employees',
    defaultMessage: 'Permissions for employees',
    role: 'employee',
  },
  {
    id: 'permissions.for_clients',
    defaultMessage: 'Permissions for clients',
    role: 'client',
  },
];

const ResolutionsComponent = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    breadcrumbsResolution(dispatch);
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
        {mainRoles.map(({ id, defaultMessage }, index) => (
          <Tab
            label={intl.formatMessage({
              id: id,
              defaultMessage: defaultMessage,
            })}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      {mainRoles.map(({ role }, index) => (
        <TabPanel value={value} index={index}>
          <RoleResolutionComponent role={role} />
        </TabPanel>
      ))}
    </Box>
  );
};

export default ResolutionsComponent;
