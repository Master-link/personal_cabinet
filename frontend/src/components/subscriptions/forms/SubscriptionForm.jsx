import { Field, Form } from 'react-final-form';
import { validate } from './validate';
import { Button, Grid } from '@material-ui/core';
import { messageI18n } from 'src/services/intl/intl';
import { FilterForm } from 'src/components/news/form/FilterForm';
import { AutocompleteAsync } from 'src/components/_helpers/FinalForm/Controls/AutocompleteAsync';
import { onChangeAutocompleteService } from 'src/components/_helpers/Transaction/Form/functions/onChangeAutocompleteService';
import { TextFieldAdapter } from 'src/components/_helpers/FinalForm/Controls';
import Myspinner from 'src/components/share/myspinner.component';
import arrayMutators from 'final-form-arrays';
import { RenderServiceFields } from './RenderServiceFields';
import { onSubmit } from './onSubmit';
import * as PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import SnackbarUtils from '../../../utilities/SnackbarUtils';
import ClaimReject from '../../claims/ClaimReject/ClaimReject.component';
import { SwitchAdapter } from '../../_helpers/FinalForm/Controls/SwitchAdapter';

const builderErrors = (error) => {
  try {
    for (const [key, value] of Object.entries(
      error.response.data,
    )) {
      return (
        <ul className="error-toast">
          <li>{key}:</li>
          <li>{value.join(', ')}</li>
        </ul>
      );
    }
  } catch (e) {
    return 'error saving';
  }
};

const subscriptionStatuses = [
  'state_continue',
  'state_new',
];

const SubscriptionForm = ({
  approvingClaim,
  changeAutoContinueActivation,
  claimId,
  clearService,
  clearTariff,
  client_id,
  crm,
  disabled,
  history,
  isClaimOnReview,
  readOnly,
  service,
  serviceOption,
  serviceOptions,
  setServiceName,
  setServiceOption,
  setTariff,
  setTariffOption,
  setupValues,
  tariff,
  tariffOption,
  tariffOptions,
}) => {
  let submit = () => {};
  return (
    <>
      {disabled && <Myspinner />}
      <FilterForm
        formButtons={
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={(event) => {
                submit(event);
              }}
              disabled={!service && true}
            >
              {messageI18n('save', 'Save')}
            </Button>
            {isClaimOnReview && claimId && (
              <ClaimReject id={claimId} />
            )}
          </Grid>
        }
      />
      <div className="appeal_wrap">
        <Form
          onSubmit={async (values) => {
            const errors = validate(
              values,
              service,
              tariff,
            );
            if (Object.keys(errors).length === 0) {
              try {
                await onSubmit({
                  ...values,
                  ...{ client_id: client_id },
                });
                await approvingClaim();
                SnackbarUtils.success(
                  messageI18n(
                    'save_success',
                    'Successfully saving',
                  ),
                );
                history.push(
                  `/clients/show/${client_id}/services/show/${service?.id}/subscriptions`,
                );
              } catch (e) {
                SnackbarUtils.error(
                  <div>{builderErrors(e)}</div>,
                );
              }
            } else {
              return errors;
            }
          }}
          mutators={{
            ...arrayMutators,
          }}
          initialValues={setupValues}
          render={({
            handleSubmit,
            form: {
              mutators: { push, pop },
            },
            form,
          }) => {
            submit = handleSubmit;
            return (
              <form onSubmit={handleSubmit} noValidate>
                <Grid
                  container
                  sm={12}
                  lg={6}
                  xs={6}
                  alignItems="flex-start"
                  spacing={2}
                >
                  {subscriptionStatuses.includes(
                    setupValues.state,
                  ) && (
                    <Grid item xs={12} key="state">
                      <Field
                        component={SwitchAdapter}
                        name={'continue_subscription'}
                        label={
                          <FormattedMessage
                            id="replace_closed_since"
                            defaultMessage="Activate this subscription on closing nearby for similar tariff"
                          />
                        }
                        onChange={
                          changeAutoContinueActivation
                        }
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} key="state">
                    <Field
                      component={TextFieldAdapter}
                      name={'state'}
                      required
                      disabled
                      label={
                        <FormattedMessage
                          id="state"
                          defaultMessage="State"
                        />
                      }
                      value="New"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    key="service_autocomplete"
                  >
                    <Field name="service_id">
                      {({ input }) => (
                        <AutocompleteAsync
                          disabled={readOnly.includes(
                            'service_id',
                          )}
                          key="service-autocomplete"
                          options={serviceOptions}
                          fieldName="service_id"
                          onInputChange={setServiceName}
                          label={
                            <FormattedMessage
                              id="service"
                              defaultMessage="Service"
                            />
                          }
                          onChange={async (value) => {
                            onChangeAutocompleteService(
                              input,
                              value,
                              setServiceOption,
                            );
                            if (!input) {
                              clearService(form);
                            } else {
                              clearTariff(form);
                            }
                          }}
                          value={serviceOption}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} key="message">
                    <Field name="tariff_id">
                      {({ input }) => (
                        <AutocompleteAsync
                          key="tariff-autocomplete"
                          options={tariffOptions}
                          fieldName="tariff_id"
                          onInputChange={() => {}}
                          label={
                            <FormattedMessage
                              id="tariff"
                              defaultMessage="Tariff"
                            />
                          }
                          disabled={readOnly.includes(
                            'tariff_id',
                          )}
                          onChange={async (value) => {
                            onChangeAutocompleteService(
                              input,
                              value,
                              setTariffOption,
                            );
                            setTariff(value);
                            if (!value) {
                              clearTariff(form);
                            } else {
                              form.change(
                                'tariff_id',
                                value.id,
                              );
                            }
                          }}
                          value={tariffOption}
                        />
                      )}
                    </Field>
                  </Grid>
                  {service && tariff && (
                    <RenderServiceFields
                      client_id={client_id}
                      crm={crm}
                      service={service}
                      tariff={tariff}
                      form={form}
                      onAdd={push}
                      onRemove={pop}
                      initialValue={setupValues}
                      readOnly={readOnly}
                    />
                  )}
                </Grid>
              </form>
            );
          }}
        />
      </div>
    </>
  );
};

export default SubscriptionForm;

SubscriptionForm.propTypes = {
  approvingClaim: PropTypes.func.isRequired,
  changeAutoContinueActivation: PropTypes.func.isRequired,
  claimId: PropTypes.number.isRequired,
  clearService: PropTypes.func.isRequired,
  clearTariff: PropTypes.func.isRequired,
  client_id: PropTypes.number.isRequired,
  crm: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  history: PropTypes.number.isRequired,
  isClaimOnReview: PropTypes.bool.isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
  service: PropTypes.shape({
    ticket: PropTypes.shape({
      kind: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  serviceOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  serviceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setServiceName: PropTypes.func.isRequired,
  setServiceOption: PropTypes.func.isRequired,
  setTariff: PropTypes.func.isRequired,
  setTariffOption: PropTypes.func.isRequired,
  setupValues: PropTypes.shape({
    jsondata: {
      paid_on: PropTypes.string.isRequired,
      renewal: PropTypes.bool.isRequired,
    },
    service_id: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  tariff: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    duration_kind: PropTypes.string.isRequired,
    advance_payment: PropTypes.string.isRequired,
    started_at: PropTypes.string.isRequired,
    opsms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
        limit: PropTypes.number.isRequired,
        operator_id: PropTypes.number.isRequired,
        smsable_id: PropTypes.number.isRequired,
        smsable_type: PropTypes.string.isRequired,
      }),
    ).isRequired,
    extra: PropTypes.shape({
      allow_client_subscription: PropTypes.bool.isRequired,
      allow_with_confirmation: PropTypes.bool.isRequired,
      changeable: PropTypes.bool.isRequired,
      credit_limit: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  tariffOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  tariffOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
