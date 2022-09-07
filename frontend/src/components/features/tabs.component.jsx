import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { FormattedMessage } from 'react-intl';
import { a11yProps } from './a11y-props';
import { useStyles } from './use-styles';
import { TabPanel } from './tab-panel.component';
import * as PropTypes from 'prop-types';

export const TabsComponent = ({
  tabs,
  selectedTab,
  valueTabPanel,
  history,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(selectedTab);

  const handleChange = (event, newValue) => {
    history.push(event.currentTarget.dataset.link);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tabs.map((item, index) => (
            <Tab
              key={index}
              label={
                <FormattedMessage
                  id={item.id}
                  defaultMessage={item.defaultMessage}
                />
              }
              data-link={item.link}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>

      {tabs.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          {valueTabPanel}
        </TabPanel>
      ))}
    </div>
  );
};

TabsComponent.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedTab: PropTypes.number.isRequired,
  valueTabPanel: PropTypes.node,
  history: PropTypes.object,
};
