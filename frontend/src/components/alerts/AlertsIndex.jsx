import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getClient } from 'src/services/client-http.service';
import {
  getAlerts,
  putAlert,
} from 'src/services/alert-http.service';
import { FormattedMessage, useIntl } from 'react-intl';
import { Tr } from './Tr';
import { thIndex } from './thIndex';
import * as PropTypes from 'prop-types';
import Myspinner from 'src/components/share/myspinner.component';
import { DialogSelector } from './DialogSelector/DialogSelector';
import { useSnackbar } from 'notistack';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../_helpers/tableThlabelBuilder';
import { StyledTableRow } from '../_helpers/StyledTableRow';
import { StyledTableCell } from '../_helpers/StyledTableCell';
import { LIMIT } from '../../constants/tableParams';
import { breadcrumbsAlerts } from './breadcrumbsAlerts';

const renderTableBody = (data, setActiveAlert) => {
  if (data.length > 0)
    return data.map(
      (
        { id, name, sms_enabled, email_enabled, state },
        index,
      ) => (
        <Tr
          key={index}
          id={id}
          name={name}
          sms_enabled={sms_enabled}
          email_enabled={email_enabled}
          onClick={setActiveAlert}
          inactive={state === 'disabled' ? ' inactive' : ''}
          state={state}
        />
      ),
    );

  return (
    <StyledTableRow hover onClick={() => {}}>
      <StyledTableCell
        colSpan={3}
        className="no_data"
        align="left"
      >
        <FormattedMessage
          id="no_data"
          defaultMessage="No data"
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

const AlertsIndex = ({ client_id }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const page = 1;
  const sort = 'name';
  const order = 'desc';

  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [activeAlert, setActiveAlert] = useState(null);
  const [alert, setAlert] = useState(null);
  const [client, setClient] = useState(null);

  const fetchClient = async () => {
    try {
      const {
        data: { client },
      } = await getClient(client_id);
      setClient(client);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAlerts = async () => {
    try {
      setDisabled(false);
      const {
        data: { data },
      } = await getAlerts(
        page,
        sort,
        order,
        LIMIT,
        client_id,
      );
      setData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(true);
    }
  };

  const saveAlerts = async (alertData) => {
    try {
      const { data: response } = await putAlert(
        activeAlert,
        alertData,
      );

      const index = data.findIndex(
        ({ id }) => id == activeAlert,
      );
      setData(
        Object.values({ ...data, [index]: response }),
      );

      enqueueSnackbar(
        intl.formatMessage({
          id: 'save_success',
          defaultMessage: 'Successfully saving',
        }),
        {
          variant: 'success',
        },
      );
    } catch (e) {
      enqueueSnackbar(
        'Произошла ошибка при отправке данных на сервер',
        { variant: 'error' },
      );
    }
  };

  useEffect(() => {
    setAlert(data.find(({ id }) => id == activeAlert));
  }, [activeAlert]);

  useEffect(() => {
    fetchAlerts();
    fetchClient();
  }, []);

  useEffect(() => {
    if (client) {
      breadcrumbsAlerts(
        dispatch,
        client.name,
        client.crm.crm,
        client.id,
      );
    }
  }, [client]);

  if (!disabled) return <Myspinner />;

  return (
    <Paper>
      <TableContainer>
        <Table
          size="medium"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {thIndex.map((item, index) => (
                <RenderThMaterial
                  key={index}
                  sort={''}
                  thSort={item.sort}
                  onClick={() => {}}
                  order={''}
                  id={item.id}
                  defaultMessage={item.defaultMessage}
                  label={tableThlabelBuilder(
                    item.noFormat,
                    item.defaultMessage,
                    item.id,
                  )}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableBody(data, setActiveAlert)}
          </TableBody>
        </Table>
      </TableContainer>
      {activeAlert && alert && (
        <DialogSelector
          alert_type={alert.alert_type}
          email_enabled={alert.email_enabled}
          setting={alert.setting}
          sms_enabled={alert.sms_enabled}
          onCloseDialog={() => setActiveAlert(null)}
          onSubmit={async (values) => {
            await saveAlerts(values);
            setActiveAlert(null);
          }}
        />
      )}
    </Paper>
  );
};

AlertsIndex.propTypes = {
  client_id: PropTypes.number.isRequired,
};

export default AlertsIndex;
