import { Field, Form } from 'react-final-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import cn from 'classnames';
import {
  DatePickerAdapter,
  SelectAdapter,
} from '../../_helpers/FinalForm/Controls';
import moment from 'moment';
import { PaperDialogComponent } from '../../_helpers/MuiDialogs/PaperDialogComponent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonUI } from '../../../ui/prepared';
import { AutocompleteAsyncV2 } from '../../_helpers/FinalForm/Controls/AutocompleteAsyncV2';
import { searchClient } from '../../../services/client-http.service';
import React from 'react';

const SearchForm = ({
  clientId,
  initialValues,
  intl,
  onCloseDialog,
  onSubmit,
  serviceId,
  serviceOptions,
  onReset,
}) => {
  const sourceOptions = [
    { id: 0, name: '1C' },
    {
      id: 1,
      name: intl.formatMessage({
        id: 'lk',
        defaultMessage: 'Personal Cabinet',
      }),
    },
    { id: 2, name: 'SMS' },
    {
      id: 5,
      name: intl.formatMessage({
        id: 'advance_payment',
        defaultMessage: 'Advance Payment',
      }),
    },
    {
      id: 6,
      name: intl.formatMessage({
        id: 'callbot',
        defaultMessage: 'CallBot',
      }),
    },
  ];

  const handleChangeDateField = (
    form,
    fieldName,
    value,
  ) => {
    if (value) {
      return form.change(
        fieldName,
        moment(value).format('YYYY-MM-DD'),
      );
    }

    return form.change(fieldName, '');
  };

  const generateDateLabel = (labelId, defaultMessage) => (
    <>
      <FormattedMessage
        id="period"
        defaultMessage="Period"
      />{' '}
      <FormattedMessage
        id={labelId}
        defaultMessage={defaultMessage}
      />
    </>
  );

  const handleChangeClient = async (name) => {
    try {
      const {
        data: { data: clients },
      } = await searchClient({
        page: 1,
        name,
      });
      return clients;
    } catch (_e) {
      return [];
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form, values }) => {
        return (
          <div className="ml-2">
            <form
              onSubmit={handleSubmit}
              noValidate
              className={cn('flexbox', 'user-search-form')}
            >
              <Dialog
                open
                onClose={onCloseDialog}
                maxWidth="sm"
                fullWidth
                aria-labelledby="dialog-title"
                PaperComponent={PaperDialogComponent}
              >
                <DialogTitle id="dialog-title">
                  <FormattedMessage
                    id="filter_for_table"
                    defaultMessage="Filter for table"
                  />
                </DialogTitle>

                <DialogContent>
                  {!clientId && (
                    <div
                      className={cn('mr-2', 'date-from')}
                    >
                      <Field name="client">
                        {({ input, meta }) => (
                          <AutocompleteAsyncV2
                            urlApi={handleChangeClient}
                            fieldName="client_id"
                            label={intl.formatMessage({
                              id: 'client',
                              defaultMessage: 'Client',
                            })}
                            disabled={!!clientId}
                            onChange={(value) => {
                              const selected = JSON.stringify(
                                value.map(
                                  ({ id, name }) => {
                                    return {
                                      id: id,
                                      name: name,
                                    };
                                  },
                                ),
                              );
                              form.change(
                                'client_id',
                                selected,
                              );
                            }}
                            defaultValue={
                              form.getState().values
                                .client_id || '[]'
                            }
                          />
                        )}
                      </Field>
                    </div>
                  )}

                  {!serviceId && (
                    <div
                      className={cn('mr-2', 'date-from')}
                    >
                      <Field
                        component={SelectAdapter}
                        name="service_id"
                        label={
                          <FormattedMessage
                            id="service"
                            defaultMessage="Service"
                          />
                        }
                        options={serviceOptions}
                        keyName="name"
                        allowEmpty
                        emptyText=<FormattedMessage
                          id="no_select"
                          defaultMessage="No select"
                        />
                      />
                    </div>
                  )}

                  <div className={cn('mr-2', 'date-from')}>
                    <Field
                      component={SelectAdapter}
                      name="source"
                      label={
                        <FormattedMessage
                          id="source"
                          defaultMessage="Source"
                        />
                      }
                      options={sourceOptions}
                      keyName="name"
                      allowEmpty
                      emptyText=<FormattedMessage
                        id="no_select"
                        defaultMessage="No select"
                      />
                    />
                  </div>

                  <div className={cn('mr-2', 'date-from')}>
                    <Field
                      component={DatePickerAdapter}
                      name="date_gte"
                      id="date_gte"
                      label={generateDateLabel(
                        'from',
                        'From',
                      )}
                      onChange={(value) => {
                        handleChangeDateField(
                          form,
                          'date_gte',
                          value,
                        );
                      }}
                    />
                  </div>

                  <div className={cn('mr-2', 'date-from')}>
                    <Field
                      component={DatePickerAdapter}
                      name="date_lte"
                      id="date_lte"
                      label={generateDateLabel('to', 'To')}
                      onChange={(value) => {
                        handleChangeDateField(
                          form,
                          'date_lte',
                          value,
                        );
                      }}
                    />
                  </div>
                </DialogContent>
                <DialogActions className="m-3">
                  <div className={cn('flex', 'space_btw')}>
                    <div>
                      <ButtonUI
                        onClick={onReset}
                        color="secondary"
                        text={
                          <FormattedMessage
                            id="reset"
                            defaultMessage="Reset"
                          />
                        }
                      />
                    </div>

                    <div>
                      <ButtonUI
                        className={cn('ml-1', 'mr-1')}
                        onClick={handleSubmit}
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        text={
                          <FormattedMessage
                            id="search"
                            defaultMessage="Search"
                          />
                        }
                      />
                      <ButtonUI
                        className={cn('ml-1', 'mr-1')}
                        onClick={onCloseDialog}
                        color="secondary"
                        text={
                          <FormattedMessage
                            id="cancel"
                            defaultMessage="Cancel"
                          />
                        }
                      />
                    </div>
                  </div>
                </DialogActions>
              </Dialog>
            </form>
          </div>
        );
      }}
    />
  );
};

SearchForm.propTypes = {
  clientId: PropTypes.string,
  initialValues: PropTypes.shape({
    search: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  intl: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  serviceId: PropTypes.string,
  serviceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SearchForm;
