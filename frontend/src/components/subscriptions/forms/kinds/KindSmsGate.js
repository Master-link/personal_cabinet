import { Grid } from '@material-ui/core';
import {
  SelectAdapter,
  TextFieldAdapter,
} from 'src/components/_helpers/FinalForm/Controls';
import { Field } from 'react-final-form';
import { SmsOperators } from '../SmsOperators';
import * as PropTypes from 'prop-types';
import { CommonFields } from './CommonFields';
import AddSmsLoginContainer from 'src/utilities/smsLogin/AddSmsLogin.container';

export const KindSmsGate = ({
  client_id,
  crm,
  form,
  intl,
  operators,
  onRemove,
  onAdd,
  smsLogins,
  tariff,
  readOnly,
}) => (
  <>
    <CommonFields
      tariff={tariff}
      form={form}
      readOnly={readOnly}
    />

    <Grid item xs={12} key="monthly_fee">
      <Field
        component={TextFieldAdapter}
        name={'jsondata.monthly_fee'}
        label={intl.formatMessage({
          id: 'subscribe.monthly_fee',
          defaultMessage: 'Monthly fee',
        })}
        typeField="number"
      />
    </Grid>

    {tariff.extra.changeable && (
      <Grid item xs={12} key="subscribe_price">
        <Field
          component={TextFieldAdapter}
          disabled={readOnly.includes(
            'jsondata.subscribe_price',
          )}
          name={'jsondata.subscribe_price'}
          label={intl.formatMessage({
            id: 'subscribe.price',
            defaultMessage: 'The subscription price',
          })}
        />
      </Grid>
    )}

    <Grid item xs={12} key="sms_login">
      <AddSmsLoginContainer
        client_id={client_id}
        crm={crm}
        onAdd={(value) => {
          form.change('jsondata.sms_login', value.id);
        }}
      />
      <Field
        keyName="title"
        component={SelectAdapter}
        name={'jsondata.sms_login'}
        label={intl.formatMessage({
          id: 'smslogin',
          defaultMessage: 'SMS login',
        })}
        options={smsLogins}
      />
    </Grid>

    <SmsOperators
      operators={operators}
      onRemove={onRemove}
      onAdd={onAdd}
    />
  </>
);

KindSmsGate.propTypes = {
  client_id: PropTypes.number.isRequired,
  crm: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  intl: PropTypes.func.isRequired,
  operators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  smsLogins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};
