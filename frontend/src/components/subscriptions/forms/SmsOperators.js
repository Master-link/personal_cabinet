import { Grid } from '@material-ui/core';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import * as PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import Button from '@material-ui/core/Button';
import React from 'react';

export const SmsOperators = ({
  operators,
  onAdd,
  onRemove,
}) => {
  const intl = useIntl();
  return (
    <Grid item xs={12} key="sms_resources">
      <legend className="MuiFormLabel-root MuiInputLabel-shrink false">
        {intl.formatMessage({
          id: 'sms.resources_for_subscription',
          defaultMessage: 'Resources for the Subscription',
        })}
      </legend>

      <div className="pb-3">
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            onAdd('opsms_attributes', undefined)
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
          onClick={() => onRemove('opsms_attributes')}
          className="ml-3"
        >
          {intl.formatMessage({
            id: 'delete',
            defaultMessage: 'Remove',
          })}
        </Button>
      </div>
      <FieldArray name="opsms_attributes">
        {({ fields }) =>
          fields.map((name, index) => (
            <Grid
              container
              id={name}
              key={name}
              xs={12}
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={4} style={{ display: 'flex' }}>
                <Field
                  name={`${name}.operator_id`}
                  component="select"
                  className="form-control"
                >
                  <option value="">
                    {intl.formatMessage({
                      id: 'choose',
                      defaultMessage: 'Choose',
                    })}{' '}
                    {intl.formatMessage({
                      id: 'operator',
                      defaultMessage: 'an Operator',
                    })}
                  </option>
                  {operators.map((e) => {
                    return (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
                </Field>
              </Grid>

              <Grid item xs={4} style={{ display: 'flex' }}>
                <Field
                  name={`${name}.limit`}
                  component="input"
                  type="number"
                  placeholder="С лимита"
                />
              </Grid>

              <Grid item xs={4} style={{ display: 'flex' }}>
                <Field
                  name={`${name}.price`}
                  component="input"
                  type="number"
                  placeholder="Стоимость СМС"
                />

                <button
                  type="button"
                  title="удалить тариф"
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
};

SmsOperators.propTypes = {
  operators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
