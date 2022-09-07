import { Field, Form } from 'react-final-form';
import { PanelForm } from '../../users/createUser/PanelForm';
import { Grid } from '@material-ui/core';
import { ButtonUI } from '../../../ui/prepared';
import { FormattedMessage } from 'react-intl';
import { validate } from './validate';
import {
  CkeditorAdapter,
  SelectAdapter,
  TextFieldAdapter,
} from '../../_helpers/FinalForm/Controls';
import { SelectMultipleAdapter } from '../../_helpers/FinalForm/Controls/SelectMultipleAdapter';
import { service_options } from './service-options';
import { SwitchAdapter } from '../../_helpers/FinalForm/Controls/SwitchAdapter';
import * as PropTypes from 'prop-types';
import {
  SMS_GATE,
  TECH_SUPPORT,
} from '../../../constants/types';
import { entityPropType } from './EntityProp.types';

export const UserForm = ({
  initialValues,
  onSubmit,
  countries,
  legalEntities,
  currencies,
  serviceStates,
}) => {
  let submit = () => {};
  return (
    <>
      <div className="flex_column">
        <div className="flex_panel">
          <PanelForm
            formButtons={
              <>
                <Grid item>
                  <ButtonUI
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={(event) => {
                      submit(event);
                    }}
                    text={
                      <FormattedMessage
                        id="save"
                        defaultMessage="Save"
                      />
                    }
                  />
                </Grid>
              </>
            }
          />
        </div>
      </div>

      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, form }) => {
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
                className="p-20"
              >
                <Grid item xs={12}>
                  <Field
                    component={TextFieldAdapter}
                    name={'name'}
                    label={
                      <FormattedMessage
                        id="name"
                        defaultMessage="Name"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SelectMultipleAdapter}
                    options={countries}
                    isMultiple
                    name="country_ids"
                    keyName="name"
                    onChange={(value) => {
                      form.change('country_ids', value);
                    }}
                    label={
                      <FormattedMessage
                        id="country"
                        defaultMessage="Country"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SelectAdapter}
                    options={currencies}
                    name="currency_id"
                    keyName="name"
                    label={
                      <FormattedMessage
                        id="currency"
                        defaultMessage="Currency"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SelectAdapter}
                    options={legalEntities}
                    name="legal_entity_id"
                    keyName="name"
                    label={
                      <FormattedMessage
                        id="urlico"
                        defaultMessage="Legal entity"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SelectAdapter}
                    options={serviceStates}
                    name="state"
                    keyName="name"
                    label={
                      <FormattedMessage
                        id="state"
                        defaultMessage="State"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SelectAdapter}
                    options={service_options}
                    name="ticket.kind"
                    keyId="value"
                    keyName="text"
                    label={
                      <FormattedMessage
                        id="type"
                        defaultMessage="Type"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextFieldAdapter}
                    name="ticket.lumpsum"
                    label={
                      <FormattedMessage
                        id="lumpsum"
                        defaultMessage="Lumpsum"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SwitchAdapter}
                    name="ticket.can_suspend"
                    label={
                      <FormattedMessage
                        id="may_be_suspend"
                        defaultMessage="Subscribe may be suspend"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SwitchAdapter}
                    name="ticket.count_balance"
                    label={
                      <FormattedMessage
                        id="count_balance"
                        defaultMessage="Count balance"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SwitchAdapter}
                    name="ticket.use_credit"
                    label={
                      <FormattedMessage
                        id="use_credit_means"
                        defaultMessage="Use credit means"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SwitchAdapter}
                    name="ticket.count_statistic"
                    label={
                      <FormattedMessage
                        id="account_statistics"
                        defaultMessage="Account statistics"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SwitchAdapter}
                    name="ticket.allow_subscribe"
                    label={
                      <FormattedMessage
                        id="allow_clients_subscribe_service"
                        defaultMessage="Allow clients subscribe service"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={SwitchAdapter}
                    name="ticket.require_submit_client"
                    label={
                      <FormattedMessage
                        id="require_manager_confirm_to_subscribe_client"
                        defaultMessage="Require manager confirm to allow subscribe"
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={CkeditorAdapter}
                    name="ticket.description"
                    label={
                      <FormattedMessage
                        id="pg.description"
                        defaultMessage="Description"
                      />
                    }
                    onChangeData={({ editor }) =>
                      form.change(
                        'ticket.description',
                        editor.getData(),
                      )
                    }
                    height="170px"
                    uiColor="#cccccc"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={CkeditorAdapter}
                    name="alert_template_email"
                    label={
                      <FormattedMessage
                        id="pattern.email_notofications"
                        defaultMessage="Email pattern for notifications"
                      />
                    }
                    onChangeData={({ editor }) =>
                      form.change(
                        'alert_template_email',
                        editor.getData(),
                      )
                    }
                    height="170px"
                    uiColor="#cccccc"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={CkeditorAdapter}
                    name="alert_template_sms"
                    label={
                      <FormattedMessage
                        id="pattern.sms_notofications"
                        defaultMessage="Email pattern for notifications"
                      />
                    }
                    onChangeData={({ editor }) =>
                      form.change(
                        'alert_template_sms',
                        editor.getData(),
                      )
                    }
                    height="170px"
                    uiColor="#cccccc"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={CkeditorAdapter}
                    name="agreement"
                    label={
                      <FormattedMessage
                        id="claim.agreement"
                        defaultMessage="Claim agreement"
                      />
                    }
                    onChangeData={({ editor }) =>
                      form.change(
                        'agreement',
                        editor.getData(),
                      )
                    }
                    height="170px"
                    uiColor="#cccccc"
                  />
                </Grid>

                {form.getFieldState('ticket.kind') &&
                  form.getFieldState('ticket.kind')
                    .value === SMS_GATE && (
                    <>
                      <Grid item xs={12}>
                        <Field
                          component={CkeditorAdapter}
                          name="ticket.alert_email_smpp"
                          label={
                            <FormattedMessage
                              id="pattern.email_no_auth_smpp"
                              defaultMessage="Email pattern no auth SMPP"
                            />
                          }
                          onChangeData={({ editor }) =>
                            form.change(
                              'ticket.alert_email_smpp',
                              editor.getData(),
                            )
                          }
                          height="170px"
                          uiColor="#cccccc"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={CkeditorAdapter}
                          name="ticket.alert_sms_tm_smpp"
                          label={
                            <FormattedMessage
                              id="pattern.sms_no_auth_smpp"
                              defaultMessage="Sms pattern no auth SMPP"
                            />
                          }
                          onChangeData={({ editor }) =>
                            form.change(
                              'ticket.alert_sms_tm_smpp',
                              editor.getData(),
                            )
                          }
                          height="170px"
                          uiColor="#cccccc"
                        />
                      </Grid>
                    </>
                  )}

                {form.getFieldState('ticket.kind') &&
                  form.getFieldState('ticket.kind')
                    .value === TECH_SUPPORT && (
                    <>
                      <Grid item xs={12}>
                        <Field
                          component={CkeditorAdapter}
                          name="ticket.tms_finish_subscribe_email"
                          label={
                            <FormattedMessage
                              id="pattern.email_notofications_expired_subscribe"
                              defaultMessage="Email pattern on expired subscribe"
                            />
                          }
                          onChangeData={({ editor }) =>
                            form.change(
                              'ticket.tms_finish_subscribe_email',
                              editor.getData(),
                            )
                          }
                          height="170px"
                          uiColor="#cccccc"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={CkeditorAdapter}
                          name="ticket.tms_finish_subscribe_sms"
                          label={
                            <FormattedMessage
                              id="pattern.sms_notofications_expired_subscribe"
                              defaultMessage="Sms pattern on expired subscribe"
                            />
                          }
                          onChangeData={({ editor }) =>
                            form.change(
                              'ticket.tms_finish_subscribe_sms',
                              editor.getData(),
                            )
                          }
                          height="170px"
                          uiColor="#cccccc"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={CkeditorAdapter}
                          name="ticket.tms_tmserver_email"
                          label={
                            <FormattedMessage
                              id="pattern.email_notofications_expired_subscribe"
                              defaultMessage="Email pattern on expired subscribe"
                            />
                          }
                          onChangeData={({ editor }) =>
                            form.change(
                              'ticket.tms_tmserver_email',
                              editor.getData(),
                            )
                          }
                          height="170px"
                          uiColor="#cccccc"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={CkeditorAdapter}
                          name="ticket.tms_tmserver_sms"
                          label={
                            <FormattedMessage
                              id="pattern.sms_notofications_accessible_tms"
                              defaultMessage="Sms pattern on accessible TMS server"
                            />
                          }
                          onChangeData={({ editor }) =>
                            form.change(
                              'ticket.tms_tmserver_sms',
                              editor.getData(),
                            )
                          }
                          height="170px"
                          uiColor="#cccccc"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={CkeditorAdapter}
                          name="ticket.tms_backup_email"
                          label={
                            <FormattedMessage
                              id="pattern.email_notofications_last_backup"
                              defaultMessage="Email pattern for notifications about last backup"
                            />
                          }
                          onChangeData={({ editor }) =>
                            form.change(
                              'ticket.tms_backup_email',
                              editor.getData(),
                            )
                          }
                          height="170px"
                          uiColor="#cccccc"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={CkeditorAdapter}
                          name="ticket.tms_backup_sms"
                          label={
                            <FormattedMessage
                              id="pattern.sms_notofications_last_backup"
                              defaultMessage="Sms pattern for notifications about last backup"
                            />
                          }
                          onChangeData={({ editor }) =>
                            form.change(
                              'ticket.tms_backup_sms',
                              editor.getData(),
                            )
                          }
                          height="170px"
                          uiColor="#cccccc"
                        />
                      </Grid>
                    </>
                  )}
              </Grid>
            </form>
          );
        }}
      />
    </>
  );
};

UserForm.propTypes = {
  initialValues: PropTypes.shape({
    notify_expires_days: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    currency_id: PropTypes.number.isRequired,
    country_ids: PropTypes.string.isRequired,
    legal_entity_id: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    alert_template_email: PropTypes.string.isRequired,
    alert_template_sms: PropTypes.string.isRequired,
    ticket: PropTypes.shape({
      kind: PropTypes.string.isRequired,
      lumpsum: PropTypes.number.isRequired,
      can_suspend: PropTypes.bool.isRequired,
      count_balance: PropTypes.bool.isRequired,
      use_credit: PropTypes.bool.isRequired,
      count_statistic: PropTypes.bool.isRequired,
      allow_subscribe: PropTypes.bool.isRequired,
      require_submit_client: PropTypes.bool.isRequired,
      agreement: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      alert_email_smpp: PropTypes.string,
      alert_sms_tm_smpp: PropTypes.string,
      tms_finish_subscribe_email: PropTypes.string,
      tms_finish_subscribe_sms: PropTypes.string,
      tms_tmserver_email: PropTypes.string,
      tms_tmserver_sms: PropTypes.string,
      tms_backup_email: PropTypes.string,
      tms_backup_sms: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  countries: entityPropType,
  legalEntities: entityPropType,
  currencies: entityPropType,
  serviceStates: entityPropType,
};
