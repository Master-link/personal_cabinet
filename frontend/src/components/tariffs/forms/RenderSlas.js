import { Grid } from '@material-ui/core';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export const RenderSlas = ({ onAdd, onRemove, intl }) => (
  <Grid item xs={12} key="extra.new_tariff_slas">
    <legend className="MuiFormLabel-root MuiInputLabel-shrink false">
      {intl.formatMessage({
        id: 'packages.slas',
        defaultMessage: 'Packages SLA',
      })}
    </legend>

    <div className="pb-3">
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          onAdd('extra.new_tariff_slas', undefined)
        }
      >
        {intl.formatMessage({
          id: 'add',
          defaultMessage: 'Add',
        })}
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => onRemove('extra.new_tariff_slas')}
        className="ml-3"
      >
        {intl.formatMessage({
          id: 'delete',
          defaultMessage: 'Remove',
        })}
      </Button>
    </div>
    <FieldArray name="extra.new_tariff_slas">
      {({ fields }) =>
        fields.map((name, index) => (
          <Grid
            container
            key={name}
            xs={12}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={4} style={{ display: 'flex' }}>
              <Field
                name={`${name}.name`}
                component="input"
                placeholder={intl.formatMessage({
                  id: 'packages.name',
                  defaultMessage: 'Packages name',
                })}
              />
            </Grid>

            <Grid item xs={4} style={{ display: 'flex' }}>
              <Field
                name={`${name}.price`}
                component="input"
                type="number"
                placeholder={intl.formatMessage({
                  id: 'packages.price',
                  defaultMessage: 'Packages price',
                })}
              />
            </Grid>

            <Grid item xs={4} style={{ display: 'flex' }}>
              <button
                type="button"
                className="remove_item"
                onClick={() => fields.remove(index)}
              />
            </Grid>
          </Grid>
        ))
      }
    </FieldArray>
  </Grid>
);

RenderSlas.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  intl: PropTypes.func.isRequired,
};
