import { useCallback, useState } from 'react';
import { TextField } from 'mui-rff';
import { Autocomplete } from '@material-ui/lab';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import { DEBOUNCE_WAIT } from 'src/constants/debounceWait';

const handleInputChangeFactory = (onInputChange) =>
  debounce(
    (newInputValue) =>
      onInputChange(newInputValue.target.value),
    DEBOUNCE_WAIT,
  );

export const AutocompleteAsync = ({
  value,
  options,
  disabled = 'false',
  fieldName,
  onChange = () => {},
  label,
  onInputChange = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const handleInputChange = useCallback(
    handleInputChangeFactory(onInputChange),
    fieldName,
  );
  const loading = open && options.length === 0;
  const handleChange = (value) => {
    if (value) {
      onChange(value);
    } else {
      setOpen(false);
      onChange(null);
    }
  };

  return (
    <Autocomplete
      disabled={disabled}
      open={open}
      setOpen={setOpen}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      options={options}
      getOptionSelected={(option, value) =>
        option.name === value.name
      }
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={(v, value) => handleChange(value)}
      name={fieldName}
      renderInput={(params) => (
        <TextField
          {...params}
          name={fieldName}
          label={label}
          onInput={handleInputChange}
        />
      )}
    />
  );
};

AutocompleteAsync.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  fieldName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
