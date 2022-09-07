import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import { debounce } from 'lodash';

// Утилита-Форма поиска
// Кнопка используется в src/components/users/MenuItemMonitoring.component.jsx
const SearchUser = ({
  label,
  style,
  value = '',
  disabled = false,
  setSearchProps,
}) => {
  let textInput = useRef(null);

  const [search, setSearch] = useState();

  const handleSearch = debounce((text) => {
    setSearch(text);
    setSearchProps(text);
  }, 600);

  useEffect(() => {
    setSearch(value);
    textInput.current.value = value;
  }, [value]);

  return (
    <>
      <TextField
        label={label}
        style={style}
        id="search-client"
        margin="dense"
        disabled={disabled}
        defaultValue={search}
        inputRef={textInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {search && <ClearIcon
                  className="pointer"
                  onClick={() => {
                    handleSearch('');
                    textInput.current.value = '';
                  }}
                />
              }
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </>
  );
};

export default SearchUser;
