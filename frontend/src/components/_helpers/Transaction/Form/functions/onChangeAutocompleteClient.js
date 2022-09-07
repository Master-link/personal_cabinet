export const onChangeAutocompleteClient = (
  form,
  input,
  value,
  setClientData,
  setServiceData,
) => {
  form.getFieldState('service').value = null;
  input.onChange(value);
  setClientData(value);
  if (value === null) {
    form.change('service', null);
    setServiceData({
      id: null,
      name: '',
    });
    setClientData({
      id: null,
      name: '',
    });
  }
};
