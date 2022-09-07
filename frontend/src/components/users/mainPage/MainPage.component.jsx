import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { getUsers } from '../../../services/user-http.service';
import { PermissionsUtility } from '../../../utilities/permissions.utility';
import { ADD_USER } from '../../../constants/permissions';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import '../../share/share.style.scss';
import Myspinner from '../../share/myspinner.component';
import { indexTh } from 'src/components/users/mainPage/indexTh';
import SearchFormContainer from '../searchForm/SearchForm.container';
import { LIMIT } from '../../../constants/tableParams';
import cn from 'classnames';
import { generateUrlSearchPath } from '../../../utilities/generateUrlSearchPath';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';
import { useDispatch } from 'react-redux';
import { breadcrumbsUsers } from './breadcrumbsUsers';
import { Tr } from './Tr.component';

const MainPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const page = query.get('page') || 1;
  const sort = query.get('sort') || 'login';
  const order = query.get('order') || 'asc';
  const search = query.get('search') || '';
  const searchCrm = query.get('searchCrm') || '';
  const role = query.get('role') || '';
  const [pages, setPages] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const fetchData = (
    page,
    sort,
    order,
    search,
    role,
    searchCrm,
  ) => {
    setLoaded(false);
    getUsers(
      {
        page: page,
        sort: sort,
        order: order,
        limit: LIMIT,
        search: search,
        role: role,
        searchCrm: searchCrm,
      },
      {},
    )
      .then((response) => {
        const meta_total_pages =
          response.data.meta.total_pages;
        setPages(meta_total_pages);
        setData(response.data.users);
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  const onClickTr = (id) =>
    history.push(`/users/edit/${id}`);

  const handleThClick = (sort) => {
    const new_order = order === 'asc' ? 'desc' : 'asc';
    history.push({
      pathname: '/users',
      search: generateUrlSearchPath({
        search,
        role,
        searchCrm,
        page: page,
        sort: sort,
        order: new_order,
      }),
    });
  };

  const paginationProps = {
    rowsPerPageOptions: [],
    component: 'div',
    count: pages * LIMIT,
    rowsPerPage: LIMIT,
    page: page - 1,
    onChangePage: (_event, page) => {
      history.push({
        pathname: '/users',
        search: generateUrlSearchPath({
          search,
          role,
          searchCrm,
          page: page + 1,
          sort,
          order,
        }),
      });
    },
  };

  const generateSortDirection = (item, sort) =>
    sort === item.sort && item.sort ? order : '';

  useEffect(() => {
    breadcrumbsUsers(dispatch);
    fetchData(page, sort, order, search, role, searchCrm);
  }, []);

  return (
    <>
      {!loaded && <Myspinner />}
      <div className={cn('flexbox', 'ml-2', 'mr-2')}>
        <div
          className={cn('flex-container', 'mt-2', 'mb-1')}
        >
          {PermissionsUtility(ADD_USER) && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push(`/users/create`);
              }}
              className="mr-2"
            >
              <FormattedMessage
                id="users.to_create"
                defaultMessage="Add user"
              />
            </Button>
          )}

          <SearchFormContainer
            search={search}
            role={role}
            searchCrm={searchCrm}
            onSubmitProp={({
              search = '',
              role = '',
              searchCrm = '',
            }) => {
              history.push({
                pathname: '/users',
                search: generateUrlSearchPath({
                  search,
                  role,
                  searchCrm,
                }),
              });
            }}
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
          <Table
            size="medium"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                {indexTh.map((item, index) => (
                  <RenderThMaterial
                    key={index}
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
              {data.map(
                (
                  { id, crm, login, name, email, roles },
                  index,
                ) => (
                  <Tr
                    key={index}
                    crm={crm}
                    login={login}
                    name={name}
                    email={email}
                    roles={roles}
                    onClickTr={() => onClickTr(id)}
                  />
                ),
              )}
            </TableBody>
          </Table>

          <TablePagination {...paginationProps} />
        </TableContainer>
      </Paper>
    </>
  );
};

export default MainPage;
