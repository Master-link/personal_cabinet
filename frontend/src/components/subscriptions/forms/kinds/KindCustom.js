import { Grid } from '@material-ui/core';
import { TextFieldAdapter } from 'src/components/_helpers/FinalForm/Controls';
import { Field } from 'react-final-form';
import * as PropTypes from 'prop-types';
import { CommonFields } from './CommonFields';
import { FormattedMessage } from 'react-intl';

export const KindCustom = ({ form, tariff, readOnly }) => (
  <>
    <CommonFields
      tariff={tariff}
      form={form}
      readOnly={readOnly}
    />

    {tariff.extra.changeable && (
      <Grid item xs={12} key="subscribe_price">
        <Field
          component={TextFieldAdapter}
          disabled={readOnly.includes(
            'jsondata.subscribe_price',
          )}
          name={'jsondata.subscribe_price'}
          required
          label={
            <FormattedMessage
              id="subscribe.price"
              defaultMessage="The subscription price"
            />
          }
        />
      </Grid>
    )}
  </>
);

KindCustom.propTypes = {
  form: PropTypes.object.isRequired,
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};
