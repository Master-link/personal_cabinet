import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Myspinner from 'src/components/share/myspinner.component';
import { FormattedMessage } from 'react-intl';
import { getTariffs } from 'src/services/tariff-http.service';
import { getService } from 'src/services/service-http.service';
import { PermissionsUtility } from 'src/utilities/permissions.utility';
import { ADD_TARIFF } from 'src/constants/permissions';
import Tr from './tr.component';
import { Toolbar } from 'src/components/news/Toolbar.component';
import { useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { indexTh } from 'src/components/tariffs/indexTh';
import { LIMIT, ORDER } from 'src/constants/tableParams';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../_helpers/tableThlabelBuilder';
import { breadcrumbsTariffs } from './breadcrumbsTariffs';

const IndexForServices = ({ service_id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('started_at');
  const [order, setOrder] = useState(ORDER);
  const [pages, setPages] = useState(1);
  const limit = LIMIT;

  const [disabled, setDisabled] = useState(false);
  const [disabledService, setDisabledService] =
    useState(false);
  const [data, setData] = useState();
  const [service, setService] = useState();

  const fetchData = (
    page,
    sort,
    order,
    limit,
    client_id,
    service_id,
  ) => {
    getTariffs(
      page,
      sort,
      order,
      limit,
      client_id,
      service_id,
    )
      .then((response) => {
        const {
          data: {
            meta: { total_pages },
            tariffs,
          },
        } = response;
        setData(tariffs);
        setPages(total_pages);
      })
      .then(() => {
        setDisabled(true);
      });
  };

  // Получить информацию об услуге
  const fetchService = (id = 0) => {
    setDisabledService(false);
    getService(id)
      .then((response) => {
        setService(response.data.service);
      })
      .then(() => {
        setDisabledService(true);
      });
  };

  const handleThClick = (sort) => {
    const new_order = order === 'asc' ? 'desc' : 'asc';
    setSort(sort);
    setOrder(new_order);
  };

  const generateSortDirection = (item, sort) =>
    sort === item.sort && !!item.sort ? order : '';

  const paginationProps = {
    rowsPerPageOptions: [],
    component: 'div',
    count: pages * LIMIT,
    rowsPerPage: LIMIT,
    page: page - 1,
    onChangePage: (_event, page) => {
      setPage(page + 1);
    },
  };

  useEffect(() => {
    fetchService(service_id);
  }, []);

  useEffect(() => {
    if (service) {
      breadcrumbsTariffs(dispatch, service);
    }
  }, [service]);

  useEffect(() => {
    fetchData(page, sort, order, limit, null, service_id);
  }, [page, sort, order]);

  if (!disabled || !disabledService) {
    return <Myspinner />;
  }

  return (
    <>
      <Toolbar
        dateFilter={
          PermissionsUtility(ADD_TARIFF) && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push(
                  `/services/show/${service_id}/tariffs/create`,
                );
              }}
            >
              <FormattedMessage
                id="tariff.to_create"
                defaultMessage="+ Добавить тариф"
              />
            </Button>
          )
        }
        pagination={
          <TablePagination {...paginationProps} />
        }
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
                {indexTh.map((item, index) => (
                  <RenderThMaterial
                    sort={sort}
                    thSort={item.sort}
                    onClick={() => handleThClick(item.sort)}
                    order={order}
                    id={item.id}
                    sortDirection={generateSortDirection(
                      item,
                      sort,
                    )}
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
                  service_id={service_id}
                  history={history}
                />
              ))}
            </TableBody>
          </Table>

          <TablePagination {...paginationProps} />
        </TableContainer>
      </Paper>
    </>
  );
};

IndexForServices.propTypes = {
  service_id: PropTypes.number.isRequired,
};

export default IndexForServices;
