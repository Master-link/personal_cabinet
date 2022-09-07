import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 200,
    maxWidth: 200,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const SelectMultiMui = ({
  items = [],
  handleChange = () => {},
  label = 'Label',
  value = [],
  className = '',
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const classes = useStyles();

  const onChangeAction = (value = '') => {
    setSelectedValue(value);
    handleChange(value);
  };

  return (
    <FormControl className={`${classes.formControl} ${className}`}>
      <InputLabel id="select-manager-label">{label}</InputLabel>
      <Select
        labelId="select-manager-label"
        id="services-select"
        multiple
        value={selectedValue}
        onChange={(v, _e) => onChangeAction(v.target.value)}
        input={<Input />}
        renderValue={(selected) => {
          const filteredArray = items.filter(function (itm) {
            if (selected.indexOf(itm.id) > -1) {
              return itm.name;
            }
          });
          return filteredArray.map((e) => e.name).join(', ');
        }}
        MenuProps={MenuProps}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            <Checkbox checked={selectedValue.indexOf(item.id) > -1} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectMultiMui.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  handleChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};
