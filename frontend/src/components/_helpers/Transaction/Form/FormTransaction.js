import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { validate } from './validate';
import { onSubmit } from './onSubmit';
import { TextField } from 'mui-rff';
import * as PropTypes from 'prop-types';
import { onChangeAutocompleteService } from 'src/components/_helpers/Transaction/Form/functions/onChangeAutocompleteService';
import { AutocompleteAsync } from 'src/components/_helpers/FinalForm/Controls/AutocompleteAsync';
import { UiDialog } from '../../../../ui/prepared/dialogs/UiDialog';
import { FormattedMessage } from 'react-intl';
import { SaveAndClose } from '../../../../ui/prepared/dialogActions/SaveAndClose';

export const FormTransaction = ({
  client,
  clientId,
  clientOption,
  clientOptions,
  closePopup,
  intl,
  onAfterCreate,
  onChangeClient,
  onChangeCurrentClient,
  onChangeClientName,
  onChangeClientOption,
  onChangeServiceOption,
  resetFields,
  service,
  serviceId,
  serviceOption,
  services,
}) => {
  const initialValues = { client, service };
  let submit = () => {};

  const [disabledSubmit, setDisabledSubmit] = useState(
    false,
  );

  const submitForm = (values) => {
    const errors = validate(values);
    if (Object.keys(errors).length === 0) {
      setDisabledSubmit(true);
      onSubmit({
        client_id: values.client.id,
        service_id: values.service.id,
        money: values.money,
        detail: {
          comment: values.comment,
        },
      })
        .then((id) => {
          onAfterCreate();
          setDisabledSubmit(false);
          resetFields();
        })
        .finally(() => closePopup());
    } else {
      return errors;
    }
  };

  return (
    <UiDialog
      dialogContent={
        <Form
          onSubmit={(values) => submitForm(values)}
          initialValues={initialValues}
          render={({ handleSubmit, form }) => {
            submit = handleSubmit;
            form = form;

            return (
              <form
                onSubmit={async (value) => {
                  await handleSubmit(value);
                  resetFields();
                  if (!clientId) {
                    form.change('client', {});
                  }
                  if (!serviceId) {
                    form.change('service', {});
                  }
                }}
                noValidate
              >
                <Grid
                  container
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12} key="client">
                    <Field name="client">
                      {({ input, meta }) => (
                        <AutocompleteAsync
                          options={clientOptions}
                          fieldName="client"
                          onInputChange={onChangeClientName}
                          label={intl.formatMessage({
                            id: 'client',
                            defaultMessage: 'Client',
                          })}
                          disabled={!!clientId}
                          onChange={(value) => {
                            onChangeAutocompleteService(
                              input,
                              value,
                              onChangeClientOption,
                            );
                            if (value) {
                              onChangeCurrentClient(
                                value.id,
                              );
                            } else {
                              onChangeClient({});
                              onChangeServiceOption({});
                              form.reset();
                            }
                          }}
                          value={clientOption}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} key="client">
                    <Field
                      name="service"
                      defaultValue={service}
                    >
                      {({ input, meta }) => (
                        <AutocompleteAsync
                          options={services}
                          fieldName="service"
                          label={intl.formatMessage({
                            id: 'service',
                            defaultMessage: 'Service',
                          })}
                          disabled={!!serviceId}
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

                  <Grid item xs={12} key="client">
                    <Field name="money">
                      {({ input, meta }) => (
                        <TextField
                          name="money"
                          label={intl.formatMessage({
                            id: 'sum',
                            defaultMessage: 'Sum',
                          })}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} key="comment">
                    <Field name="money">
                      {({ input, meta }) => (
                        <TextField
                          multiline={true}
                          rowsMax={10}
                          maxLength={1000}
                          name="comment"
                          label={intl.formatMessage({
                            id:
                              'transactions.details.comment',
                            defaultMessage: 'Comment',
                          })}
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        />
      }
      onCloseDialog={closePopup}
      dialogTitle={
        <FormattedMessage
          id="transactions.creating"
          defaultMessage="Creating a transaction"
        />
      }
      actions={
        <SaveAndClose
          onCloseDialog={closePopup}
          onSubmit={(event) => {
            submit(event);
          }}
          disabled={disabledSubmit}
        />
      }
      open={true}
    />
  );
};

FormTransaction.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  clientId: PropTypes.number.isRequired,
  clientOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  clientOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  closePopup: PropTypes.func,
  intl: PropTypes.func.isRequired,
  onAfterCreate: PropTypes.func,
  onChangeClient: PropTypes.func.isRequired,
  onChangeCurrentClient: PropTypes.func.isRequired,
  onChangeClientName: PropTypes.func.isRequired,
  onChangeClientOption: PropTypes.func.isRequired,
  onChangeServiceOption: PropTypes.func.isRequired,
  serviceOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  resetFields: PropTypes.func.isRequired,
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  serviceId: PropTypes.number.isRequired,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
