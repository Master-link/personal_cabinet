import { useState, useEffect } from 'react';
import Myspinner from '../../share/myspinner.component';
import { getTransactions } from '../../../services/transaction-http.service';
import { PermissionsUtility } from '../../../utilities/permissions.utility';
import { CREATE_TRANSACTION } from '../../../constants/permissions';
import CreateTransaction from 'src/components/_helpers/Transaction/CreateTransaction';
import cn from 'classnames';
import { TransactionIndex } from './TransactionIndex';
import { LIMIT } from '../../../constants/tableParams';
import { useHistory, useLocation } from 'react-router-dom';
import { generateUrlSearchPath } from '../../../utilities/generateUrlSearchPath';
import * as PropTypes from 'prop-types';
import { TmSupportWidget } from '../widgets/TmSupport.widget';
import { useDispatch } from 'react-redux';
import { breadcrumbsTransactions } from './breadcrumbsTransactions';
import { CurrentUser } from '../../../utilities/current-user.utility';
import { allowed_roles } from '../../../utilities/allowed_roles';
import {
  ADMIN,
  MANAGER,
  OBSERVER,
} from '../../../constants/roles';
import { useIntl } from 'react-intl';
import { getServicesList } from '../../../services/service-http.service';
import DialogFilter from '../dialogFilter/DialogFilter';
import {
  Paper,
  TableContainer,
  TablePagination,
} from '@material-ui/core';

const TransactionIndexComponent = ({
  client_id = '',
  service_id = '',
}) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);
  const history = useHistory();
  const route = history.location.pathname;

  const [loaded, setLoaded] = useState(true);
  const page = query.get('page') || 1;
  const sort = query.get('sort') || 'updated_at';
  const order = query.get('order') || 'desc';
  const clientId =
    query.get('transaction_filter[client_id]') || client_id;
  const serviceId =
    query.get('filter[service_id]') || service_id;
  const source = query.get('filter[source]');
  const period_gte =
    query.get('transaction_filter[period][gte]') || '';
  const period_lte =
    query.get('transaction_filter[period][lte]') || '';

  const [serviceOptions, setServiceOptions] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [transactions, setTransactions] = useState({
    data: [],
    pages: 1,
    selectedTransaction: null,
  });

  const user = CurrentUser();

  const mainRole = allowed_roles(user.all_roles, [
    ADMIN,
    MANAGER,
    OBSERVER,
  ]);

  const fetchData = async () => {
    setLoaded(false);
    try {
      const {
        data: {
          data,
          meta: { total_pages },
        },
      } = await getTransactions(
        {
          page,
          sort,
          order,
          limit: LIMIT,
          'transaction_filter[period][gte]': period_gte,
          'transaction_filter[period][lte]': period_lte,
          'transaction_filter[client_id]': clientId,
        },
        {
          service_id: serviceId,
          source,
        },
      );
      setTransactions({
        ...transactions,
        ...{ data: data },
        ...{ pages: total_pages },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const fetchServices = async () => {
    try {
      const {
        data: { data },
      } = await getServicesList();
      setServiceOptions(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(async () => {
    await fetchData();
    await fetchServices();
    breadcrumbsTransactions(dispatch, mainRole);
  }, []);

  useEffect(async () => {
    await fetchData();
  }, [
    page,
    source,
    clientId,
    serviceId,
    period_gte,
    period_lte,
    sort,
    order,
  ]);

  // для показа бокового справа попапа
  const onToggleDrawer = (transaction) => {
    setShowDrawer(!showDrawer);
    setTransactions({
      ...transactions,
      ...{ selectedTransaction: transaction },
    });
  };

  const generateRoute = (
    source,
    service_id,
    client_id,
    date_gte,
    date_lte,
    sort,
    order,
    page = 1,
  ) => {
    const newLink = {
      pathname: route,
      search: generateUrlSearchPath({
        'filter[source]': source,
        'filter[service_id]': service_id,
        'transaction_filter[client_id]': client_id,
        'transaction_filter[period][gte]': date_gte,
        'transaction_filter[period][lte]': date_lte,
        ...{ sort: sort },
        ...{ order: order },
        ...{ page: page },
      }),
    };
    history.push(newLink);
  };

  const countFilters = () => {
    const notEmptyFiltersAmount = [
      source,
      serviceId,
      clientId,
      period_gte,
      period_lte,
    ].filter((e) => {
      return (
        e !== '' && e !== 'null' && e !== null && e !== '[]'
      );
    }, 0).length;

    if (client_id && service_id) {
      return notEmptyFiltersAmount - 2;
    }

    if (client_id || service_id) {
      return notEmptyFiltersAmount - 1;
    }

    return notEmptyFiltersAmount;
  };

  const handleSearch = ({
    source = '',
    service_id = '',
    client_id = '',
    date_gte = '',
    date_lte = '',
  }) => {
    generateRoute(
      source,
      service_id,
      client_id,
      date_gte,
      date_lte,
      sort,
      order,
    );
  };

  const handleChangePage = (page) => {
    generateRoute(
      source,
      serviceId,
      clientId,
      period_gte,
      period_lte,
      sort,
      order,
      page,
    );
  };

  const onSort = (sort) => {
    const new_order = order === 'asc' ? 'desc' : 'asc';
    generateRoute(
      source,
      serviceId,
      clientId,
      period_gte,
      period_lte,
      sort,
      new_order,
    );
  };

  const handleOnReset = () => {
    generateRoute('', '', '', '', '', sort, order);
  };

  const paginationProps = {
    rowsPerPageOptions: [],
    component: 'div',
    count: transactions.pages * LIMIT,
    rowsPerPage: LIMIT,
    page: page - 1,
    onChangePage: (_event, page) => {
      handleChangePage(page + 1);
    },
  };

  if (!loaded) {
    return <Myspinner />;
  }

  return (
    <>
      <div className={cn('flexbox', 'ml-2', 'mr-2')}>
        <div
          className={cn('flex-container', 'mt-2', 'mb-1')}
        >
          {PermissionsUtility(CREATE_TRANSACTION) && (
            <CreateTransaction
              clientId={client_id}
              serviceId={service_id}
              afterCreate={fetchData}
            />
          )}

          {client_id && service_id && (
            <TmSupportWidget
              client_id={client_id}
              service_id={service_id}
            />
          )}

          <DialogFilter
            countFilters={countFilters()}
            intl={intl}
            clientId={client_id}
            serviceId={service_id}
            serviceOptions={serviceOptions}
            initialValues={{
              client_id: clientId,
              service_id: serviceId,
              source: source,
              date_gte: period_gte,
              date_lte: period_lte,
            }}
            onSubmit={handleSearch}
            onReset={handleOnReset}
          />
        </div>

        <div
          className={cn('flex-container', 'mt-2', 'mb-2')}
        >
          <TablePagination {...paginationProps} />
        </div>
      </div>

      <Paper>
        <TableContainer>
          <TransactionIndex
            transactionInfo={
              transactions.selectedTransaction
            }
            onToggleDrawer={onToggleDrawer}
            showDrawer={showDrawer}
            transactions={transactions.data}
            sort={sort}
            order={order}
            onSort={onSort}
          />
          <TablePagination {...paginationProps} />
        </TableContainer>
      </Paper>
    </>
  );
};

TransactionIndexComponent.propTypes = {
  client_id: PropTypes.string,
  service_id: PropTypes.string,
};

export default TransactionIndexComponent;
