import { Grid } from '@material-ui/core';
import {
  SelectAdapter,
  TextFieldAdapter,
} from 'src/components/_helpers/FinalForm/Controls';
import { Field } from 'react-final-form';
import * as PropTypes from 'prop-types';
import { CommonFields } from './CommonFields';

export const KindTechSupport = ({
  form,
  intl,
  newTariffHours,
  newTariffSlas,
  setCoastPackage,
  setCoastSla,
  filterPriceValue,
  tariff,
  readOnly,
}) => {
  return (
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
            label={intl.formatMessage({
              id: 'subscribe.price',
              defaultMessage: 'The subscription price',
            })}
          />
        </Grid>
      )}

      {tariff.extra.new_tariff && (
        <>
          <Grid item xs={12} key="choose_package_hours">
            <Field
              component={SelectAdapter}
              disabled={readOnly.includes(
                'jsondata.new_tariff_hours',
              )}
              id="jsondata.new_tariff_hours"
              keyName="name"
              name="jsondata.new_tariff_hours"
              label={intl.formatMessage({
                id: 'subscribe.select_package_hours',
                defaultMessage: 'Select package hours',
              })}
              options={newTariffHours}
              onChange={({ target: { value } }) => {
                setCoastPackage(
                  filterPriceValue(newTariffHours, value),
                );
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} key="choose_sla_hours">
            <Field
              component={SelectAdapter}
              disabled={readOnly.includes(
                'jsondata.new_tariff_slas',
              )}
              id="jsondata.new_tariff_slas"
              keyName="name"
              name="jsondata.new_tariff_slas"
              label={intl.formatMessage({
                id: 'subscribe.select_sla_hours',
                defaultMessage: 'Select SLA hours',
              })}
              options={newTariffSlas}
              onChange={({ target: { value } }) => {
                setCoastSla(
                  filterPriceValue(newTariffSlas, value),
                );
              }}
            />
          </Grid>
        </>
      )}
    </>
  );
};

KindTechSupport.propTypes = {
  intl: PropTypes.func.isRequired,
  newTariffHours: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  newTariffSlas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setCoastPackage: PropTypes.func.isRequired,
  setCoastSla: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};
