import { Field, Form } from 'react-final-form';
import { validate } from './validate';
import { Button, Grid } from '@material-ui/core';
import {
  DatePickerAdapter,
  SelectAdapter,
  TextFieldAdapter,
} from '../../_helpers/FinalForm/Controls';
import { FormattedMessage, useIntl } from 'react-intl';
import { types } from './types';
import { tariffPeriods } from './tariffPeriods';
import { paymentSystems } from './paymentSystems';
import { SwitchAdapter } from '../../_helpers/FinalForm/Controls/SwitchAdapter';
import { SmsOperators } from './SmsOperators';
import arrayMutators from 'final-form-arrays';
import { RenderPackages } from './RenderPackages';
import { RenderSlas } from './RenderSlas';
import * as PropTypes from 'prop-types';
import { AutocompleteAdapter } from '../../_helpers/FinalForm/Controls/AutocompleteAdapter';
import { autoAddEndDate } from '../../../utilities/autoAddEndDate';
import MuiCheckbox from '../../_helpers/mui-checkox.component';

const isDisabledFieldDates = (form) => {
  if (
    (form.getFieldState('duration_kind') &&
      !form.getFieldState('duration_kind').value) ||
    (form.getFieldState('duration_kind') &&
      [
        'duration_custom_days',
        'duration_custom_months',
      ].includes(
        form.getFieldState('duration_kind').value,
      ) &&
      form.getFieldState('extra.custom_period') &&
      !form.getFieldState('extra.custom_period').value)
  ) {
    return true;
  }
  return false;
};

const FormTariff = ({
  kind,
  initialValues,
  nomenclatureOptions,
  licenseOptions,
  smppAccountsOptions,
  smsOperators,
  saveData,
}) => {
  const intl = useIntl();

  return (
    <Form
      mutators={{
        ...arrayMutators,
      }}
      initialValues={initialValues}
      validate={validate}
      onSubmit={saveData}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop },
        },
        form,
        pristine,
        submitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="panel p_25-1_25-1">
            <div className="subpanel">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={pristine || submitting}
              >
                {intl.formatMessage({
                  id: 'save',
                  defaultMessage: 'Save',
                })}
              </Button>
            </div>
          </div>
          <Grid
            container
            sm={12}
            lg={6}
            xs={12}
            alignItems="flex-start"
            className="p-3"
          >
            <Grid item xs={12} key="name" className="mt-4">
              <Field
                component={TextFieldAdapter}
                name={'name'}
                required
                label={intl.formatMessage({
                  id: 'name',
                  defaultMessage: 'Name',
                })}
              />
            </Grid>

            <Grid item xs={12} key="kind" className="mt-4">
              <Field
                component={SelectAdapter}
                name={'kind'}
                options={types}
                required
                label={intl.formatMessage({
                  id: 'type',
                  defaultMessage: 'Type',
                })}
              />
            </Grid>

            <Grid
              item
              xs={12}
              key="duration_kind"
              className="mt-4"
            >
              <Field
                component={SelectAdapter}
                name={'duration_kind'}
                options={tariffPeriods}
                required
                label={intl.formatMessage({
                  id: 'tariff.period',
                  defaultMessage: 'Tariff period',
                })}
                onChange={() => {
                  form.change('started_at', null);
                  form.change('ended_at', null);
                }}
              />
            </Grid>

            {['payment_gate'].includes(kind) && (
              <Grid
                item
                xs={12}
                key="payment_system"
                className="mt-4"
              >
                <Field
                  component={SelectAdapter}
                  name={'extra.payment_system'}
                  options={paymentSystems}
                  label={intl.formatMessage({
                    id: 'pg.payment_system',
                    defaultMessage: 'Payment system',
                  })}
                />
              </Grid>
            )}

            {form.getFieldState('duration_kind') &&
              [
                'duration_custom_days',
                'duration_custom_months',
              ].includes(
                form.getFieldState('duration_kind').value,
              ) && (
                <Grid
                  item
                  xs={12}
                  key="extra.custom_period"
                  className="mt-4"
                >
                  <Field
                    component={TextFieldAdapter}
                    name={'extra.custom_period'}
                    required
                    label={intl.formatMessage({
                      id: 'custom_period',
                      defaultMessage: 'Custom period',
                    })}
                  />
                </Grid>
              )}

            <Grid
              item
              xs={12}
              key="started_at"
              className="mt-4"
            >
              <Field
                component={DatePickerAdapter}
                id="started_at"
                name="started_at"
                key="started_at"
                label={intl.formatMessage({
                  id: 'begin_action',
                  defaultMessage: 'Begin action',
                })}
                disabled={isDisabledFieldDates(form)}
                onChange={(value) => {
                  if (
                    form.getFieldState('duration_kind')
                      .value === 'duration_month_start' &&
                    new Date(value).getDate() !== 1
                  ) {
                    alert(
                      intl.formatMessage({
                        id: 'set_first_day_of_month',
                        defaultMessage:
                          'Set First day of month',
                      }),
                    );
                    form.change('started_at', null);
                  } else {
                    form.change('started_at', value);
                    form.change(
                      'ended_at',
                      autoAddEndDate(
                        value,
                        form.getFieldState('duration_kind')
                          .value,
                        form.getFieldState(
                          'extra.custom_period',
                        ),
                        intl.formatMessage({
                          id: 'set_correct_period',
                          defaultMessage:
                            'Set correct period',
                        }),
                      ),
                    );
                  }
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              key="ended_at"
              className="mt-4"
            >
              <Field
                component={DatePickerAdapter}
                id="ended_at"
                name="ended_at"
                key="ended_at"
                label={intl.formatMessage({
                  id: 'end_action',
                  defaultMessage: 'End action',
                })}
              />
            </Grid>

            {!['sms_gate'].includes(kind) && (
              <Grid
                item
                xs={12}
                key="extra.unfinished_period"
                className="mt-4"
              >
                <Field
                  component={SwitchAdapter}
                  name="extra.unfinished_period"
                  label={
                    <FormattedMessage
                      id="consider_unfinished_tariff_period"
                      defaultMessage="Consider unfinished tariff period"
                    />
                  }
                />
              </Grid>
            )}

            {[
              'sms_gate',
              'tech_support',
              'calls_bot',
              'custom',
              'license',
            ].includes(kind) && (
              <Grid
                item
                xs={12}
                key="extra.credit_limit"
                className="mt-4"
              >
                <Field
                  component={TextFieldAdapter}
                  name={'extra.credit_limit'}
                  required
                  typeField="number"
                  label={intl.formatMessage({
                    id: 'credit_limit',
                    defaultMessage: 'Credit limit',
                  })}
                />
              </Grid>
            )}

            {[
              'sms_gate',
              'tech_support',
              'calls_bot',
              'custom',
              'license',
              'payment_gate',
            ].includes(kind) && (
              <Grid
                item
                xs={12}
                key="advance_payment"
                className="mt-4"
              >
                <Field
                  component={TextFieldAdapter}
                  name={'advance_payment'}
                  required
                  typeField="number"
                  label={intl.formatMessage({
                    id: 'advance_payment',
                    defaultMessage: 'Advance payment',
                  })}
                />
              </Grid>
            )}

            {[
              'sms_gate',
              'tech_support',
              'calls_bot',
              'custom',
              'license',
            ].includes(kind) && (
              <Grid
                item
                xs={12}
                key="extra.nomenclature_id"
                className="mt-4"
              >
                <Field
                  component={AutocompleteAdapter}
                  name="extra.nomenclature_id"
                  label={intl.formatMessage({
                    id: 'nomenclature_id',
                    defaultMessage: 'Nomenclature id',
                  })}
                  options={nomenclatureOptions}
                  onChange={(value) => {
                    form.change('extra.nomenclature_id', [
                      value,
                    ]);
                  }}
                />
              </Grid>
            )}

            {['tech_support', 'license'].includes(kind) && (
              <Grid
                item
                xs={12}
                key="extra.license_modules"
                className="mt-4"
              >
                <Field
                  component={AutocompleteAdapter}
                  name="extra.license_modules"
                  label={intl.formatMessage({
                    id: 'licenses',
                    defaultMessage: 'License modules',
                  })}
                  options={licenseOptions}
                  onChange={(value) => {
                    form.change('extra.license_modules', [
                      value,
                    ]);
                  }}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              key="extra.documents"
              className="mt-4"
            >
              <Field
                component={TextFieldAdapter}
                name={'extra.documents'}
                label={intl.formatMessage({
                  id: 'nomenclature_name',
                  defaultMessage: 'Documents',
                })}
              />
            </Grid>

            <Grid
              item
              xs={12}
              key="extra.show_automatic_bill_option"
              className="mt-4"
            >
              <Field
                component={SwitchAdapter}
                name={'extra.show_automatic_bill_option'}
                label={intl.formatMessage({
                  id: 'show_automatic_bill_option',
                  defaultMessage:
                    'Show automatic bill option',
                })}
              />
            </Grid>

            {[
              'sms_gate',
              'tech_support',
              'calls_bot',
              'custom',
              'license',
            ].includes(kind) && (
              <Grid
                item
                xs={12}
                key="extra.allow_with_confirmation"
                className="mt-4"
              >
                <Field
                  component={SwitchAdapter}
                  name="extra.allow_with_confirmation"
                  label={
                    <FormattedMessage
                      id="allow_with_confirmation_clients"
                      defaultMessage="Allow with confirmation for clients"
                    />
                  }
                />
              </Grid>
            )}

            {[
              'sms_gate',
              'tech_support',
              'calls_bot',
              'custom',
              'license',
            ].includes(kind) && (
              <Grid
                item
                xs={12}
                key="extra.allow_client_subscription"
                className="mt-4"
              >
                <Field
                  component={SwitchAdapter}
                  name="extra.allow_client_subscription"
                  label={
                    <FormattedMessage
                      id="allow_clients_subscribe_service"
                      defaultMessage="Allow clients subscribe service"
                    />
                  }
                />
              </Grid>
            )}

            {[
              'sms_gate',
              'tech_support',
              'calls_bot',
              'custom',
              'license',
              'payment_gate',
            ].includes(kind) && (
              <Grid
                item
                xs={12}
                key="extra.changeable"
                className="mt-4"
              >
                <Field
                  component={SwitchAdapter}
                  name="extra.changeable"
                  label={
                    <FormattedMessage
                      id="allow_change_advance_payment"
                      defaultMessage="Allow change advance payment"
                    />
                  }
                />
              </Grid>
            )}

            {['sms_gate'].includes(kind) && (
              <Grid
                item
                xs={12}
                key="extra.smpp_account"
                className="mt-4"
              >
                <Field
                  component={AutocompleteAdapter}
                  name="extra.smpp_account"
                  label={intl.formatMessage({
                    id: 'smpp_account',
                    defaultMessage: 'SMPP account',
                  })}
                  options={smppAccountsOptions}
                  onChange={(value) => {
                    form.change('extra.smpp_account', [
                      value,
                    ]);
                  }}
                />
              </Grid>
            )}

            {['sms_gate', 'calls_bot'].includes(kind) && (
              <Grid
                item
                xs={12}
                key="opsms_attributes"
                className="mt-4"
              >
                <SmsOperators
                  operators={smsOperators}
                  onRemove={pop}
                  onAdd={push}
                  intl={intl}
                />
              </Grid>
            )}

            {['tech_support'].includes(kind) && (
              <>
                <Grid
                  item
                  xs={12}
                  key="settings.hours"
                  className="mt-4"
                >
                  <Field
                    component={TextFieldAdapter}
                    name={'settings.hours'}
                    typeField="number"
                    label={intl.formatMessage({
                      id: 'start_time',
                      defaultMessage:
                        'Start of time (minutes)',
                    })}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  key="settings.overtime_price"
                  className="mt-4"
                >
                  <Field
                    component={TextFieldAdapter}
                    name={'settings.overtime_price'}
                    typeField="number"
                    label={intl.formatMessage({
                      id: 'price_over_limit',
                      defaultMessage:
                        'Price over limit (rubles)',
                    })}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  key="extra.new_tariff"
                  className="mt-4"
                >
                  <Field
                    component={SwitchAdapter}
                    name="extra.new_tariff"
                    label={
                      <FormattedMessage
                        id="tariff.new_united_stp"
                        defaultMessage="New united tariff"
                      />
                    }
                    onChange={(value) => {
                      if (value) {
                        form.change(
                          'advance_payment',
                          5000,
                        );
                      }
                    }}
                    disabled={
                      (form.getFieldState(
                        'extra.urgent_tariff',
                      ) &&
                        form.getFieldState(
                          'extra.urgent_tariff',
                        ).value) ||
                      (form.getFieldState(
                        'extra.singular_tariff',
                      ) &&
                        form.getFieldState(
                          'extra.singular_tariff',
                        ).value)
                    }
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  key="extra.urgent_tariff"
                  className="mt-4"
                >
                  <Field
                    component={SwitchAdapter}
                    name="extra.urgent_tariff"
                    label={
                      <FormattedMessage
                        id="tariff.urgent_stp"
                        defaultMessage="Urgent tariff"
                      />
                    }
                    disabled={
                      (form.getFieldState(
                        'extra.new_tariff',
                      ) &&
                        form.getFieldState(
                          'extra.new_tariff',
                        ).value) ||
                      (form.getFieldState(
                        'extra.singular_tariff',
                      ) &&
                        form.getFieldState(
                          'extra.singular_tariff',
                        ).value)
                    }
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  key="extra.singular_tariff"
                  className="mt-4"
                >
                  <Field
                    component={SwitchAdapter}
                    name="extra.singular_tariff"
                    label={
                      <FormattedMessage
                        id="tariff.singular_stp"
                        defaultMessage="Singular tariff"
                      />
                    }
                    disabled={
                      (form.getFieldState(
                        'extra.new_tariff',
                      ) &&
                        form.getFieldState(
                          'extra.new_tariff',
                        ).value) ||
                      (form.getFieldState(
                        'extra.urgent_tariff',
                      ) &&
                        form.getFieldState(
                          'extra.urgent_tariff',
                        ).value)
                    }
                  />
                </Grid>

                {form.getFieldState('extra.new_tariff') &&
                  form.getFieldState('extra.new_tariff')
                    .value && (
                    <>
                      <Grid
                        item
                        xs={12}
                        key="extra.new_tariff_hours"
                        className="mt-4"
                      >
                        <RenderPackages
                          onRemove={pop}
                          onAdd={push}
                          intl={intl}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        key="extra.new_tariff_slas"
                        className="mt-4"
                      >
                        <RenderSlas
                          onRemove={pop}
                          onAdd={push}
                          intl={intl}
                        />
                      </Grid>
                    </>
                  )}
              </>
            )}
          </Grid>
        </form>
      )}
    />
  );
};

export default FormTariff;

FormTariff.propTypes = {
  id: PropTypes.number.isRequired,
  initialValues: PropTypes.shape({
    extra: PropTypes.shape({
      payment_system: PropTypes.string,
      custom_period: PropTypes.string,
      unfinished_period: PropTypes.bool,
      credit_limit: PropTypes.number,
      nomenclature_id: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      license_modules: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      new_tariff_hours: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
      }).isRequired,
      new_tariff_slas: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
      }).isRequired,
      smpp_account: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
      allow_client_subscription: PropTypes.bool,
      allow_with_confirmation: PropTypes.bool,
      changeable: PropTypes.bool,
      new_tariff: PropTypes.bool,
      singular_tariff: PropTypes.bool,
      urgent_tariff: PropTypes.bool,
    }).isRequired,
    settings: PropTypes.shape({
      hours: PropTypes.string.isRequired,
      overtime_price: PropTypes.string.isRequired,
    }).isRequired,
    service_id: PropTypes.number.isRequired,
  }).isRequired,
  nomenclatureOptions: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  licenseOptions: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  smppAccountsOptions: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  smsOperators: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  saveData: PropTypes.func.isRequired,
};
