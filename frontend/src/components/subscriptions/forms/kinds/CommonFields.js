import { Grid } from '@material-ui/core';
import { Field } from 'react-final-form';
import {
  DatePickerAdapter,
  TextFieldAdapter,
} from '../../../_helpers/FinalForm/Controls';
import { FormattedMessage } from 'react-intl';
import { calculateEndDate } from 'src/utilities/calculateEndDate';
import { ALLOWED_TARIFFS } from 'src/constants/tariffDuration';
import { SwitchAdapter } from 'src/components/_helpers/FinalForm/Controls/SwitchAdapter';
import * as PropTypes from 'prop-types';
import MuiCheckbox from '../../../_helpers/mui-checkox.component';

export const CommonFields = ({
  form,
  tariff,
  readOnly,
}) => (
  <>
    <Grid item xs={12} key="started_at">
      <Field
        disabled={readOnly.includes('started_at')}
        component={DatePickerAdapter}
        name={'started_at'}
        required
        label={
          <FormattedMessage
            id="started_at"
            defaultMessage="Started at"
          />
        }
        onChange={(value) => {
          if (
            tariff.kind === 'kind_periodic' &&
            !!tariff.ended_at
          ) {
            form.change(
              'ended_at',
              calculateEndDate(value, tariff),
            );
          }
        }}
      />
    </Grid>

    {tariff.kind === 'kind_periodic' && (
      <Grid item xs={12} key="ended_at">
        <Field
          disabled={readOnly.includes('ended_at')}
          component={DatePickerAdapter}
          name={'ended_at'}
          required
          label={
            <FormattedMessage
              id="ended_at"
              defaultMessage="Ended at"
            />
          }
        />
      </Grid>
    )}

    <Grid item xs={12} key="credit_limit">
      <Field
        disabled={readOnly.includes('credit_limit')}
        component={TextFieldAdapter}
        name={'credit_limit'}
        required
        label={
          <FormattedMessage
            id="credit_limit"
            defaultMessage="Credit limit"
          />
        }
      />
    </Grid>

    {tariff.extra.show_automatic_bill_option && (
      <Grid item xs={12} key="credit_limit">
        <Field
          component={SwitchAdapter}
          name={'jsondata.auto_send_bill'}
          required
          label={
            <FormattedMessage
              id="auto_send_bill"
              defaultMessage="Automatic send bill"
            />
          }
        />
      </Grid>
    )}

    {ALLOWED_TARIFFS.includes(tariff?.duration_kind) &&
      tariff.kind === 'kind_periodic' && (
        <Grid item xs={12} key="renewal">
          <Field
            disabled={readOnly.includes('jsondata.renewal')}
            component={SwitchAdapter}
            name={'jsondata.renewal'}
            label={
              <FormattedMessage
                id="autorenew"
                defaultMessage="Prolong if sufficient funds are available"
              />
            }
          />
        </Grid>
      )}

    <Grid item xs={12} key="jsondata.comment">
      <Field name={`jsondata.comment`} required>
        {({ input }) => (
          <TextFieldAdapter
            disabled={readOnly.includes('jsondata.comment')}
            input={input}
            rowsMax={10}
            multiline
            label={
              <FormattedMessage
                id="transactions.details.comment"
                defaultMessage="Comment"
              />
            }
          />
        )}
      </Field>
    </Grid>
  </>
);

CommonFields.propTypes = {
  form: PropTypes.object.isRequired,
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      duration_kind: PropTypes.string.isRequired,
      kind: PropTypes.string.isRequired,
      extra: PropTypes.shape({
        allow_client_subscription:
          PropTypes.bool.isRequired,
        allow_with_confirmation: PropTypes.bool.isRequired,
        changeable: PropTypes.bool.isRequired,
        credit_limit: PropTypes.string.isRequired,
        show_automatic_bill_option:
          PropTypes.bool.isRequired,
      }),
    }),
  ).isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};
