import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';

import * as PropTypes from 'prop-types';

export const AjaxSearch = ({
  id,
  variant,
  label,
  margin = 'none',
  handleSearch = () => {},
  type = 'text',
  value = '',
  className = '',
}) => {
  const [search, setSearch] = useState(value);

  const onClickAction = (e) => {
    handleSearch(e.target.value);
    setSearch(e.target.value);
  };

  const clearInput = () => {
    handleSearch('');
    setSearch('');
  };

  return (
    <TextField
      id={id}
      variant={variant}
      margin={margin}
      label={label}
      className={className}
      type={type}
      value={search}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {search && (
              <ClearIcon
                className="pointer"
                onClick={clearInput}
              />
            )}
          </InputAdornment>
        ),
      }}
      onChange={onClickAction}
    />
  );
};

AjaxSearch.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  margin: PropTypes.string,
  handleSearch: PropTypes.func,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
};
