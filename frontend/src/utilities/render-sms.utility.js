import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Field } from 'redux-form';
import { useIntl } from 'react-intl';
import cn from 'classnames';
import * as PropTypes from 'prop-types';

const RenderSms = ({
  fields,
  meta: { error },
  operators,
}) => {
  const intl = useIntl();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          fields.push();
        }}
      >
        {intl.formatMessage({
          id: 'add',
          defaultMessage: 'Add',
        })}
      </Button>
      <Table>
        <TableHead></TableHead>
        <TableBody>
          {fields.map((sms, index) => (
            <TableRow key={index}>
              <TableCell>
                <Field
                  name={`${sms}.operator_id`}
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
              </TableCell>
              <TableCell>
                <div className="display_flex">
                  <Field
                    autoComplete="off"
                    name={`${sms}.limit`}
                    type="number"
                    component="input"
                    placeholder={intl.formatMessage({
                      id: 'since_limit',
                      defaultMessage: 'Since limit',
                    })}
                    className={cn(
                      'form-control',
                      'display_flex_1_1_auto',
                    )}
                  />

                  <Field
                    autoComplete="off"
                    name={`${sms}.price`}
                    type="number"
                    component="input"
                    placeholder={intl.formatMessage({
                      id: 'price_sms',
                      defaultMessage: 'Price sms',
                    })}
                    className={cn(
                      'form-control',
                      'display_flex_1_1_auto',
                    )}
                  />

                  <button
                    type="button"
                    title={intl.formatMessage({
                      id: 'delete',
                      defaultMessage: 'Delete',
                    })}
                    className={cn(
                      'remove_item',
                      'display_flex_1_1_auto',
                    )}
                    onClick={() => {
                      fields.remove(index);
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <li className="error">{error}</li>}
    </>
  );
};

export default RenderSms;

RenderSms.propTypes = {
  fields: PropTypes.shape({
    operator_id: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    limit: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  operators: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string.isRequired,
  }).isRequired,
};
