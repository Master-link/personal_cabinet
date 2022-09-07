import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { breadcrumbsClosedRenewedMainPage } from '../functions/breadcrumbsClosedRenewedMainPage';
import { getClosedAndRenewedSubscriptions } from '../../../services/subscription-http.service';
import Myspinner from '../../share/myspinner.component';
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
import { thClosedRenewed } from './thClosedRenewed';
import { useHistory, useLocation } from 'react-router-dom';
import { LIMIT } from '../../../constants/tableParams';
import { generateUrlSearchPath } from '../../../utilities/generateUrlSearchPath';
import { Tr } from './Tr.component';
import InfoDialogContainer from '../dialog/InfoDialog.container';

const ClosedRenewedMainPage = () => {
  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [statId, setStatId] = useState(1);
  const [openInfoDialog, setOpenInfoDialog] =
    useState(false);

  const page = query.get('page') || 1;
  const sort = query.get('sort') || 'created_at';
  const order = query.get('order') || 'desc';

  const loadDetailStatistic = async () => {
    try {
      setIsLoading(true);
      const {
        data: {
          data,
          meta: { pages },
        },
      } = await getClosedAndRenewedSubscriptions({
        page: page,
        sort: sort,
        order: order,
        limit: LIMIT,
      });
      setData(data);
      setPages(pages);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const paginationProps = {
    rowsPerPageOptions: [],
    component: 'div',
    count: pages * LIMIT,
    rowsPerPage: LIMIT,
    page: page - 1,
    onChangePage: (_event, page) => {
      const newLink = {
        pathname: '/admin_dashboard/closed_renewed',
        search: generateUrlSearchPath({
          page: page + 1,
          sort: sort,
          order: order,
        }),
      };
      history.push(newLink);
    },
  };

  const handleThClick = (sort) => {
    const orderDirection = order === `asc` ? `desc` : `asc`;
    const newLink = {
      pathname: '/admin_dashboard/closed_renewed',
      search: generateUrlSearchPath({
        page: page,
        sort: sort,
        order: orderDirection,
      }),
    };
    history.push(newLink);
  };

  const handleOpenDialogClick = (id) => {
    setStatId(id);
    setOpenInfoDialog(true);
  };

  useEffect(() => {
    breadcrumbsClosedRenewedMainPage(dispatch);
  }, [dispatch]);

  useEffect(async () => {
    loadDetailStatistic();
  }, [page, sort, order]);

  if (isLoading) {
    return <Myspinner />;
  }

  return (
    <Paper>
      <TableContainer>
        <TablePagination {...paginationProps} />
        <Table
          size="medium"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {thClosedRenewed.map((item, index) => (
                <RenderThMaterial
                  key={index}
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
            {data.map(
              (
                { id, closed, renewed, created_at },
                index,
              ) => (
                <Tr
                  key={index}
                  id={id}
                  closed={closed}
                  renewed={renewed}
                  created_at={created_at}
                  onClick={() => {
                    handleOpenDialogClick(id);
                  }}
                />
              ),
            )}
          </TableBody>
        </Table>

        <TablePagination {...paginationProps} />
      </TableContainer>

      {openInfoDialog && (
        <InfoDialogContainer
          onClose={() => setOpenInfoDialog(false)}
          statId={statId}
        />
      )}
    </Paper>
  );
};

export default ClosedRenewedMainPage;
