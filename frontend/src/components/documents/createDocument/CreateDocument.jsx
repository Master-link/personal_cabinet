import { Field, Form } from 'react-final-form';
import { FilterForm } from '../../news/form/FilterForm';
import { Grid } from '@material-ui/core';
import { ButtonUI } from '../../../ui/prepared';
import { AutocompleteAsync } from '../../_helpers/FinalForm/Controls/AutocompleteAsync';
import { onChangeAutocompleteService } from '../../_helpers/Transaction/Form/functions/onChangeAutocompleteService';
import { validate } from './validate';
import {
  SelectAdapter,
  TextFieldAdapter,
} from '../../_helpers/FinalForm/Controls';
import * as PropTypes from 'prop-types';

export const CreateDocument = ({
  clientId,
  clientOption,
  clientOptions,
  initialValues,
  intl,
  isDisabledSubmit,
  onChangeClient,
  onChangeClientName,
  onChangeClientOption,
  onChangeCurrentClient,
  onChangeServiceOption,
  onSubmitForm,
  serviceOption,
  services,
  tariffs,
}) => {
  let submit = () => {};

  const submitForm = (values) => {
    const errors = validate(values);
    if (Object.keys(errors).length === 0) {
      onSubmitForm({
        client_id: values.client_id,
        service_id: values.service.id,
        tariff_id: values.tariff_id,
        price: values.price,
      });
    } else {
      return errors;
    }
  };

  const onChangeClientSelect = (input, form, value) => {
    onChangeAutocompleteService(
      input,
      value,
      onChangeClientOption,
    );
    if (value) {
      onChangeCurrentClient(value.id);
    } else {
      onChangeClient({});
      onChangeServiceOption({});
      form.reset();
    }
  };

  return (
    <>
      <FilterForm
        formButtons={
          <Grid item>
            <ButtonUI
              disabled={isDisabledSubmit}
              variant="contained"
              color="primary"
              type="submit"
              onClick={(event) => {
                submit(event);
              }}
              text={intl.formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            />
          </Grid>
        }
      />

      <Form
        onSubmit={(values) => submitForm(values)}
        initialValues={initialValues}
        render={({ handleSubmit, form }) => {
          submit = handleSubmit;

          return (
            <form noValidate>
              <Grid
                container
                alignItems="flex-start"
                className="p-20"
              >
                {/**/}
                <Grid item xs={12} key="client">
                  <Field name="client">
                    {({ input, meta }) => (
                      <AutocompleteAsync
                        options={clientOptions}
                        fieldName="client_id"
                        onInputChange={onChangeClientName}
                        label={intl.formatMessage({
                          id: 'client',
                          defaultMessage: 'Client',
                        })}
                        disabled={!!clientId}
                        onChange={(value) => {
                          onChangeClientSelect(
                            input,
                            form,
                            value,
                          );
                        }}
                        value={clientOption}
                      />
                    )}
                  </Field>
                </Grid>
                {/**/}

                {/**/}
                <Grid item xs={12} key="service">
                  <Field name="service">
                    {({ input, meta }) => (
                      <AutocompleteAsync
                        options={services}
                        fieldName="service"
                        label={intl.formatMessage({
                          id: 'service',
                          defaultMessage: 'Service',
                        })}
                        disabled={!clientOption.id}
                        onChange={(value) => {
                          onChangeAutocompleteService(
                            input,
                            value,
                            onChangeServiceOption,
                          );
                        }}
                        value={serviceOption}
                      />
                    )}
                  </Field>
                </Grid>
                {/**/}

                {/**/}
                <Grid item xs={12} key="tariffs">
                  <Field
                    component={SelectAdapter}
                    keyName="name"
                    name="tariff_id"
                    label={intl.formatMessage({
                      id: 'tariff',
                      defaultMessage: 'Tariff',
                    })}
                    disabled={!serviceOption.id}
                    options={tariffs}
                  />
                </Grid>
                {/**/}

                {/**/}
                <Grid item xs={12} key="price">
                  <Field
                    component={TextFieldAdapter}
                    name="price"
                    label={intl.formatMessage({
                      id: 'sum',
                      defaultMessage: 'Sum',
                    })}
                  />
                </Grid>
                {/**/}
              </Grid>
            </form>
          );
        }}
      />
    </>
  );
};

CreateDocument.propTypes = {
  clientId: PropTypes.string.isRequired,
  clientOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  clientOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  initialValues: PropTypes.shape({
    client_id: PropTypes.number,
  }).isRequired,
  intl: PropTypes.func.isRequired,
  isDisabledSubmit: PropTypes.bool.isRequired,
  onChangeClient: PropTypes.func.isRequired,
  onChangeClientName: PropTypes.func.isRequired,
  onChangeClientOption: PropTypes.func.isRequired,
  onChangeCurrentClient: PropTypes.func.isRequired,
  onChangeServiceOption: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  postData: PropTypes.func.isRequired,
  serviceOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  tariffs: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
