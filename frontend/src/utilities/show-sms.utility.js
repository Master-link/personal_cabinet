import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Field } from 'redux-form';
import { useIntl } from 'react-intl';

const ShowSms = ({ fields, meta: { error }, ...props }) => {
  const intl = useIntl();
  const { operators } = props;
  return (
    <>
      <Table>
        <TableHead></TableHead>
        <TableBody>
          {fields.map((sms, index) => (
            <TableRow key={index}>
              <TableCell
                style={{ margin: '0', padding: '0' }}
              >
                <Field
                  name={`${sms}.operator_id`}
                  component="select"
                  className="form-control"
                  disabled
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
              <TableCell
                style={{ margin: '0', padding: '0' }}
              >
                <div style={{ display: 'flex' }}>
                  <Field
                    autoComplete="off"
                    name={`${sms}.limit`}
                    type="number"
                    component="input"
                    placeholder="С лимита"
                    className="form-control"
                    disabled
                    style={{
                      flex: '1 1 auto',
                      margin: '10px',
                    }}
                  />

                  <Field
                    autoComplete="off"
                    name={`${sms}.price`}
                    type="number"
                    component="input"
                    placeholder="Стоимость СМС"
                    className="form-control"
                    disabled
                    style={{
                      flex: '1 1 auto',
                      margin: '10px',
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

export default ShowSms;
