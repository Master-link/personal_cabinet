export const onChangeAutocompleteService = (
  input,
  value,
  setData,
) => {
  input.onChange(value);
  if (value === null) {
    setData({
      id: null,
      name: '',
    });
  } else {
    setData(value);
  }
};
