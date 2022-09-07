import React, { useState, useEffect, useMemo } from 'react';
import { putClient } from '../../services/client-http.service';
import EditForm from './forms/edit-form.component';
import Myspinner from '../share/myspinner.component';
import { getClient } from '../../services/client-http.service';
import { FormattedMessage, useIntl } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useSnackbar } from 'notistack';
import '../share/share.style.scss';
import { Breadcrumbs } from '@material-ui/core';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { breadcrumbsClientEdit } from './breadcrumbsClientEdit';
import * as PropTypes from 'prop-types';

const renderTableRow = (
  { name, default_name, value },
  index = 0,
) => (
  <TableRow key={index}>
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

const Edit = ({ id }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      setDisabled(false);
      const {
        data: { client },
      } = await getClient(id);
      setData(client);
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(true);
    }
  };

  const rows = useMemo(
    () =>
      data && data.client_requisite
        ? [
            {
              name: 'basis.document',
              default_name: 'Basis document',
              value: data.client_requisite.act_because_of,
            },
            {
              name: 'legal.address',
              default_name: 'Legal address',
              value: data.client_requisite.address,
            },
            {
              name: 'bank',
              default_name: 'Bank',
              value: data.client_requisite.bank_name,
            },
            {
              name: 'bik',
              default_name: 'BIK',
              value: data.client_requisite.bank_bik,
            },
            {
              name: 'login.inn',
              default_name: 'INN',
              value: data.client_requisite.inn,
            },
            {
              name: 'full.name',
              default_name: 'Full name',
              value: data.client_requisite.full_name,
            },
            {
              name: 'chief',
              default_name: 'Chief',
              value: data.client_requisite.head_chief,
            },
            {
              name: 'chief.signature',
              default_name: 'Chief signature',
              value:
                data.client_requisite.head_chief_signature,
            },
            {
              name: 'passport.series',
              default_name: 'Passport series',
              value: data.client_requisite.passport_series,
            },
            {
              name: 'passport.number',
              default_name: 'Passport number',
              value: data.client_requisite.passport_number,
            },
            {
              name: 'passport.issued',
              default_name: 'Issued by',
              value: data.client_requisite.passport_issued,
            },
            {
              name: 'passport.issued_date',
              default_name: 'Date of issued',
              value:
                data.client_requisite.passport_issued_date,
            },
          ]
        : [],
    [data],
  );

  const updateChanges = async (data) => {
    try {
      setDisabled(false);
      const {
        data: { client },
      } = await putClient(id, data);
      setData(client);
      enqueueSnackbar(
        intl.formatMessage({
          id: 'successfully_save',
          defaultMessage: 'Successfully saved',
        }),
        {
          variant: 'success',
        },
      );
    } catch (e) {
      enqueueSnackbar(e?.response?.data?.message, {
        variant: 'error',
      });
      console.error(e);
    } finally {
      setDisabled(true);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  useEffect(() => {
    if (data) {
      breadcrumbsClientEdit(
        dispatch,
        `${data.name} ID ${data.crm.crm}`,
      );
    }
  }, [data]);

  if (!disabled) {
    return <Myspinner />;
  }

  if (!data) {
    return (
      <FormattedMessage
        id="no_data"
        defaultMessage="No data"
      />
    );
  }

  return (
    <>
      <EditForm
        initialValues={data}
        onSubmit={updateChanges}
      />
      <Breadcrumbs maxItems={1}>
        <div className={cn('mt-3', 'mb-3', 'ml-3')}>
          <FormattedMessage
            id="bank.details"
            defaultMessage="Bank details"
          />
        </div>
      </Breadcrumbs>

      <Table className="profile mt-1 thw-200">
        <TableBody>
          {rows.map((item, index) =>
            renderTableRow(item, index),
          )}
        </TableBody>
      </Table>
    </>
  );
};

Edit.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Edit;
