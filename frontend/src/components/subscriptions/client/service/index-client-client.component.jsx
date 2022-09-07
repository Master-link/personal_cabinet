import { useState, useEffect } from 'react';
import TrClientClient from './tr-client-client.component';
import { getTmSubscription } from '../../../../services/subscription-http.service';
import { getSubscriptions } from '../../../../services/subscription-http.service';
import { getBalance } from '../../../../services/balance-http.service';
import { TECH_SUPPORT } from '../../../../constants/kinds';
import 'font-awesome/css/font-awesome.min.css';
import '../../../share/share.style.scss';
import ClientBalance from 'src/components/_helpers/Balance/ClientBalance.component';
import * as PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { thIndex } from './thIndex';
import { RenderThMaterial } from '../../../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../../../_helpers/tableThlabelBuilder';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { LIMIT } from '../../../../constants/tableParams';
import Myspinner from '../../../share/myspinner.component';
import { breadcrumbsIndexClientClient } from './breadcrumbsIndexClientClient';
import { useDispatch } from 'react-redux';

const IndexClientClient = ({ client, service }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('subscriptions.id');
  const [order, setOrder] = useState('desc');
  const limit = LIMIT;
  const [pages, setPages] = useState(1);

  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [overtime, setOvertime] = useState(0);

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [serviceBalanceId, setServiceBalanceId] = useState(
    null,
  );

  const fetchData = async (
    page = 1,
    sort = 'subscriptions.id',
    order = 'asc',
  ) => {
    try {
      setDisabled(false);
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
        client.id,
        service.id,
      );
      setPages(total_pages);
      setData(subscriptions);
    } catch (error) {
      console.error(error);
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
    breadcrumbsIndexClientClient(dispatch, service.name);

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
      <div className="panel p_25-1_25-1">
        <div className="subpanel">
          <ClientBalance
            client_id={client.id}
            service_id={service.id}
          />
        </div>
      </div>

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
                <TrClientClient
                  key={index}
                  data={item}
                  service={service}
                  onTrClick={() => {
                    history.push(
                      `/services_client/show/${service.id}/subscriptions/show/${item.id}`,
                    );
                  }}
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

IndexClientClient.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setActive: PropTypes.func.isRequired,
  setBreadcrumb: PropTypes.func.isRequired,
  setBalance: PropTypes.func.isRequired,
  needTime: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default IndexClientClient;
