import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Myspinner from '../share/myspinner.component';
import { useHistory, useLocation } from 'react-router-dom';
import { generateUrlSearchPath } from '../../utilities/generateUrlSearchPath';
import cn from 'classnames';
import { LIMIT } from '../../constants/tableParams';
import { getClients } from '../../services/client-http.service';
import { thClients } from './thClients';
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
import { breadcrumbsClients } from './breadcrumbsClients';
import { Tr } from './tr.component';
import { DialogFilter } from './dialogFilter/DialogFilter';

const ClientIndex = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);

  const page = query.get('page') || 1;
  const sort = query.get('sort') || 'crms.crm';
  const order = query.get('order') || 'asc';
  const search = query.get('search') || '';
  const state = query.get('state') || '';
  const employee_id = query.get('employee_id') || '';
  const [loaded, setLoaded] = useState(false);
  const [showPages, setShowPages] = useState(false);
  const [clients, setClients] = useState({
    data: [],
    pages: 1,
  });

  const onClickTr = (id) => {
    history.push(`/clients/edit/${id}`);
  };

  const fetchData = async () => {
    setLoaded(false);
    try {
      const {
        data: {
          clients,
          meta: { total_pages },
        },
      } = await getClients(
        {
          page: page,
          sort: sort,
          order: order,
          limit: LIMIT,
        },
        {
          search: search,
          employee_id: employee_id,
          state: state,
        },
      );
      setClients({ data: clients, pages: total_pages });
      setShowPages(total_pages * LIMIT > LIMIT);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    breadcrumbsClients(dispatch);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, sort, order, employee_id, search, state]);

  const handleThClick = (sort) => {
    const orderDirection = order === `asc` ? `desc` : `asc`;

    history.push({
      pathname: '',
      search: generateUrlSearchPath({
        employee_id,
        search,
        state,
        page,
        ...{ sort: sort },
        ...{ order: orderDirection },
      }),
    });
  };

  return (
    <>
      {!loaded && <Myspinner />}
      <div className={cn('flexbox', 'ml-2', 'mr-2')}>
        <div
          className={cn('flex-container', 'mt-2', 'mb-1')}
        >
          <DialogFilter
            employee_id={employee_id}
            search={search}
            state={state}
            onReset={() => {
              history.push({
                pathname: '',
              });
            }}
            onSubmitProp={({
              search = '',
              employee_id,
              state,
            }) => {
              history.push({
                pathname: '',
                search: generateUrlSearchPath({
                  search,
                  employee_id,
                  state,
                }),
              });
            }}
          />
        </div>

        <div
          className={cn('flex-container', 'mt-2', 'mb-2')}
        >
          {showPages && (
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={clients.pages * LIMIT}
              rowsPerPage={LIMIT}
              page={page - 1}
              onChangePage={(_event, page) =>
                history.push({
                  pathname: '',
                  search: generateUrlSearchPath({
                    employee_id,
                    search,
                    state,
                    page: page + 1,
                    sort,
                    order,
                  }),
                })
              }
            />
          )}
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
                {thClients.map((item, index) => (
                  <RenderThMaterial
                    key={index}
                    style={item.style}
                    sort={sort}
                    thSort={item.sort}
                    onClick={() => handleThClick(item.sort)}
                    order={order}
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
              {clients.data.map((item, index) => (
                <Tr
                  key={index}
                  data={item}
                  onClickTr={() => onClickTr(item.id)}
                />
              ))}
            </TableBody>
          </Table>

          {showPages && (
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={clients.pages * LIMIT}
              rowsPerPage={LIMIT}
              page={page - 1}
              onChangePage={(_event, page) =>
                history.push({
                  pathname: '',
                  search: generateUrlSearchPath({
                    employee_id,
                    search,
                    state,
                    page: page + 1,
                    sort,
                    order,
                  }),
                })
              }
            />
          )}
        </TableContainer>
      </Paper>
    </>
  );
};

export default ClientIndex;
