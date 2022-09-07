import React, { useState } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

// Фильтр ролей
// Кнопка используется в src/components/users/MenuItemMonitoring.component.jsx
const FilterTx = ({
  data = [],
  selectedVtm = null,
  doAction,
  divClassName = 'ml-3',
  selectClassName = 'w200',
}) => {
  const [item, setItem] = useState(
    selectedVtm || data[0].id,
  );

  const handleSetItem = (value) => {
    setItem(value);
    doAction(value);
  };

  return (
    <>
      <div className={divClassName}>
        <FormControl>
          <InputLabel
            style={{ margin: 0 }}
            shrink
            htmlFor="managers-select"
          >
            <FormattedMessage
              id="choose_company"
              defaultMessage="Choose a company"
            />
          </InputLabel>

          <Select
            label="Роль"
            labelId="select-manager-label"
            id="managers-select"
            value={item}
            onChange={(v, _e) =>
              handleSetItem(v.target.value)
            }
            className={selectClassName}
          >
            {data.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default FilterTx;
