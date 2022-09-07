import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setBreadcrumb,
  setActive,
} from '../../redux/breadcrumbs/breadcrumbs.actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Myspinner from '../share/myspinner.component';
import { FormattedMessage } from 'react-intl';

const About = ({ ...props }) => {
  const { setActive, setBreadcrumb } = props;
  const [client, setClient] = useState();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setActive('/');
    setBreadcrumb([
      {
        name: (
          <FormattedMessage
            id="about.company"
            defaultMessage="О компании"
          />
        ),
        to: '/',
      },
    ]);
    const c = JSON.parse(
      localStorage.getItem('currentClient'),
    );
    setClient(c.client);
    setDisabled(true);
  }, []);

  const renderTableRow = (
    key,
    name,
    default_name,
    value,
  ) => {
    return (
      <TableRow key={key}>
        <TableCell component="th">
          <FormattedMessage
            id={name}
            defaultMessage={default_name}
          />
          :
        </TableCell>
        <TableCell align="left">{value}</TableCell>
      </TableRow>
    );
  };

  if (disabled) {
    return (
      <>
        <h6
          style={{
            padding: '10px',
            margin: '10px 0 0',
          }}
        >
          <FormattedMessage
            id="common"
            defaultMessage="Common"
          />
        </h6>
        <Table className="profile ">
          <TableHead></TableHead>
          <TableBody>
            {renderTableRow(
              'client.name',
              'name',
              'Name',
              client.name,
            )}
            {renderTableRow(
              'client.email',
              'email',
              'Email',
              client.email,
            )}
            {renderTableRow(
              'client.organization',
              'organization',
              'Organization',
              client.organization,
            )}
            {renderTableRow(
              'client.manager',
              'manager',
              'Manager',
              client.user == null ? '-' : client.user.name,
            )}
          </TableBody>
        </Table>

        <h6
          style={{
            padding: '10px',
            margin: '10px 0 0',
          }}
        >
          <FormattedMessage
            id="bank.details"
            defaultMessage="Bank details"
          />
        </h6>
        <Table className="profile ">
          <TableHead></TableHead>
          <TableBody>
            {renderTableRow(
              'client.client_requisite.act_because_of',
              'basis.document',
              'Basis document	',
              client.client_requisite.act_because_of,
            )}
            {renderTableRow(
              'client.client_requisite.address',
              'legal.address',
              'Legal address',
              client.client_requisite.address,
            )}
            {renderTableRow(
              'client.client_requisite.bank_name',
              'bank',
              'Bank',
              client.client_requisite.bank_name,
            )}
            {renderTableRow(
              'client.client_requisite.bank_bik',
              'bik',
              'BIK',
              client.client_requisite.bank_bik,
            )}
            {renderTableRow(
              'client.client_requisite.full_name',
              'full.name',
              'Full name',
              client.client_requisite.full_name,
            )}
            {renderTableRow(
              'client.client_requisite.head_chief',
              'chief',
              'Chief',
              client.client_requisite.head_chief,
            )}
            {renderTableRow(
              'client.client_requisite.head_chief_signature',
              'chief.signature',
              'Chief signature',
              client.client_requisite.head_chief_signature,
            )}
            {renderTableRow(
              'client.client_requisite.kpp',
              'kpp',
              'KPP',
              client.client_requisite.kpp,
            )}
            {renderTableRow(
              'client.client_requisite.inn',
              'login.inn',
              'INN',
              client.client_requisite.inn,
            )}
          </TableBody>
        </Table>

        <h6
          style={{
            padding: '10px',
            margin: '10px 0 0',
          }}
        >
          <FormattedMessage
            id="notifications"
            defaultMessage="Notifications"
          />
        </h6>
        <Table className="profile ">
          <TableHead></TableHead>
          <TableBody>
            {renderTableRow(
              'client.settings.alert_emails',
              'alert.emails',
              'Alert emails',
              client.settings.alert_emails,
            )}
            {renderTableRow(
              'client.settings.alert_phone',
              'alert.phone',
              'Alert phone',
              client.settings.alert_phone,
            )}
          </TableBody>
        </Table>
      </>
    );
  } else {
    return <Myspinner />;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: (data) => dispatch(setBreadcrumb(data)),
    setActive: (active) => dispatch(setActive(active)),
  };
};

export default connect(null, mapDispatchToProps)(About);
