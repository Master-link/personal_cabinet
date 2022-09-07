import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Tr from './tr.component';
import { getTmSubscription } from '../../../../services/subscription-http.service';
import { getSubscriptions } from '../../../../services/subscription-http.service';
import ServicePanel from '../../../services/service-panel.component';
import * as PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CLOSED } from '../../../../constants/subscriptions';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../../../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../../../_helpers/tableThlabelBuilder';
import { thIndex } from './thIndex';
import { LIMIT } from '../../../../constants/tableParams';
import Myspinner from '../../../share/myspinner.component';
import { breadcrumbsIndexClient } from './breadcrumbsIndexClient';
import { TECH_SUPPORT } from '../../../../constants/types';
import { getBalance } from '../../../../services/balance-http.service';

const IndexClient = ({ client, service }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('subscriptions.id');
  const [order, setOrder] = useState('desc');
  const [pages, setPages] = useState(1);

  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [overtime, setOvertime] = useState(0);

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [serviceBalanceId, setServiceBalanceId] =
    useState(null);

  const fetchData = async (
    page = 1,
    sort = 'subscriptions.id',
    order = 'asc',
    limit = 20,
    client_id,
    service_id,
  ) => {
    setDisabled(false);
    try {
      const {
        data: {
          meta: { total_pages },
          subscriptions,
        },
      } = await getSubscriptions(
        page,
        sort,
        order,
        limit,
        client_id,
        service_id,
      );

      setPages(total_pages);
      setData(subscriptions);
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(true);
    }
  };

  const fetchTmSubscription = async (
    client_id,
    service_id,
  ) => {
    try {
      const {
        data: { hours, minutes, overtime_price },
      } = await getTmSubscription(client_id, service_id);

      return {
        hours,
        minutes,
        overtime_price,
      };
    } catch (e) {
      console.error(e);
      return {
        hours: null,
        minutes: null,
        overtime_price: null,
      };
    }
  };

  const setupServiceBalance = async () => {
    try {
      const {
        data: { id },
      } = await getBalance(client.id, service.id);
      setServiceBalanceId(id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleThClick = (sort) => {
    const new_order = order === 'asc' ? 'desc' : 'asc';
    setSort(sort);
    setOrder(new_order);
  };

  const generateSortDirection = (item, sort) =>
    sort === item.sort && !!item.sort ? order : '';

  useEffect(() => {
    breadcrumbsIndexClient(
      dispatch,
      client.id,
      client.name,
      client.crm.crm,
      service.name,
    );

    if (service.ticket.kind === TECH_SUPPORT) {
      fetchTmSubscription(client.id, service.id).then(
        ({ hours, minutes, overtime_price }) => {
          setHours(hours);
          setMinutes(minutes);
          setOvertime(overtime_price);
        },
      );
    }
    setupServiceBalance().then(() => {});
  }, []);

  useEffect(() => {
    fetchData(
      page,
      sort,
      order,
      LIMIT,
      client.id,
      service.id,
    );
  }, [sort, order, page]);

  if (!disabled) {
    return <Myspinner />;
  }

  return (
    <>
      <ServicePanel
        client={client}
        service={service}
        hours={hours}
        minutes={minutes}
        overtime={overtime}
        serviceBalanceId={serviceBalanceId}
      />
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
                    sort={sort}
                    thSort={item.sort}
                    onClick={() => {
                      handleThClick(item.sort);
                    }}
                    order={order}
                    id={item.id}
                    sortDirection={generateSortDirection}
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
              {data.map((item, index) => (
                <Tr
                  key={index}
                  data={item}
                  onTrClick={() => {
                    history.push(
                      `/clients/show/${item.client.id}/services/show/${service.id}/subscriptions/edit/${item.id}`,
                    );
                  }}
                  id={item.id}
                  tariff_name={item.tariff.name}
                  inactive={
                    item.state === CLOSED ? ' inactive' : ''
                  }
                  started_at={item.started_at}
                  ended_at={item.ended_at}
                  state={item.state}
                />
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={pages * LIMIT}
            rowsPerPage={LIMIT}
            page={page - 1}
            onChangePage={(_event, page) => {
              setPage(page + 1);
            }}
          />
        </TableContainer>
      </Paper>
    </>
  );
};

IndexClient.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    crm: PropTypes.shape({
      crm: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default IndexClient;
