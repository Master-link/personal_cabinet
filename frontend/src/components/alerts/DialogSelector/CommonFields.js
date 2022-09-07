import { Field } from 'react-final-form';
import { SwitchAdapter } from '../../_helpers/FinalForm/Controls/SwitchAdapter';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@material-ui/core';

const renderField = (
  { name, id, defaultMessage },
  key = 0,
) => (
  <Grid item xs={12}>
    <Field
      key={key}
      component={SwitchAdapter}
      name={name}
      label={
        <FormattedMessage
          id={id}
          defaultMessage={defaultMessage}
        />
      }
    />
  </Grid>
);

const fields = [
  {
    name: 'email_enabled',
    id: 'alerts_email',
    defaultMessage: 'Email alerts',
  },
];

export const CommonFields = () => (
  <>{fields.map(renderField)}</>
);
