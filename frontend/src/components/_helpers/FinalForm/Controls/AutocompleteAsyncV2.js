import { useCallback, useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import { DEBOUNCE_WAIT } from 'src/constants/debounceWait';
import { TextField } from '@material-ui/core';

const handleInputChangeFactory = (onInputChange) =>
  debounce(
    (newInputValue) =>
      onInputChange(newInputValue.target.value),
    DEBOUNCE_WAIT,
  );

export const AutocompleteAsyncV2 = ({
  defaultValue,
  disabled = 'false',
  fieldName,
  label,
  multiple = true,
  onChange = () => {},
  urlApi,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const handleInputChange = useCallback(
    handleInputChangeFactory(setInputValue),
    fieldName,
  );
  const loading = open && options.length === 0;

  useEffect(async () => {
    try {
      const data = await urlApi(inputValue);
      if (defaultValue !== '') {
        const unionOptions = [
          ...data,
          ...JSON.parse(defaultValue),
        ];
        const uniqOptions = [
          ...new Set(unionOptions.map(({ id }) => id)),
        ].map((e) =>
          unionOptions.find(({ id }) => id == e),
        );
        setOptions(uniqOptions);
      } else {
        setOptions(data);
      }
    } catch (_e) {}
  }, [inputValue]);

  return (
    <Autocomplete
      multiple={multiple}
      disabled={disabled}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => {
        return option.id === value.id;
      }}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      onChange={(v, value) => {
        onChange(value);
      }}
      defaultValue={JSON.parse(defaultValue)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            onInput={handleInputChange}
          />
        );
      }}
    />
  );
};

AutocompleteAsyncV2.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  urlApi: PropTypes.func.isRequired,
};
