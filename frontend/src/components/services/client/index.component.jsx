import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Myspinner from 'src/components/share/myspinner.component';
import { getServices } from 'src/services/service-http.service';
import { getClient } from 'src/services/client-http.service';
import { Tr } from './Tr.component';
import { FormattedMessage } from 'react-intl';
import AddIcon from '@material-ui/icons/Add';
import { PermissionsUtility } from 'src/utilities/permissions.utility';
import {
  ADD_CLAIM_SUBSCRIPTION,
  ADD_SUBSCRIPTION,
} from 'src/constants/permissions';
import { thIndex } from './thIndex';
import 'src/components/share/share.style.scss';
import { breadcrumbsIndex } from './functions/breadcrumbsIndex';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import { CurrentUser } from 'src/utilities/current-user.utility';
import { ADMIN } from 'src/constants/roles';
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
import { generateLinkTr } from './functions/generateLinkTr';

const Index = ({ client_id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = CurrentUser();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('services.id');
  const [order, setOrder] = useState('desc');
  const limit = 15;
  const [pages, setPages] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState();

  const fetchData = () => {
    setDisabled(false);
    getServices(
      {
        page: page,
        sort: sort,
        order: order,
        limit: limit,
        'filter[subscriptions][client_id]': client_id,
      },
      {},
    )
      .then((response) => {
        setPages(response.data.meta.total_pages);
        setData(response.data.services);
      })
      .then(() => {
        setDisabled(true);
      });
  };
  const fetchClient = (id = 0) => {
    return getClient(id).then(
      (response) => response.data.client,
    );
  };

  useEffect(() => {
    fetchClient(client_id).then((client) =>
      breadcrumbsIndex(client, dispatch),
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, sort, order]);

  if (!disabled) return <Myspinner />;

  return (
    <>
      <div className="panel p_25-1_25-1">
        <div className="subpanel">
          {PermissionsUtility(ADD_SUBSCRIPTION) && (
            <Button
              variant="contained"
              color="primary"
              className="mb-3 mt-3"
              type="button"
              onClick={() => {
                history.push(
                  `/clients/show/${client_id}/services/show/0/subscriptions/create/new/for_client`,
                );
              }}
            >
              <AddIcon />
              <FormattedMessage
                id="subscription.add"
                defaultMessage="Add a subscription"
              />
            </Button>
          )}
          {PermissionsUtility(ADD_CLAIM_SUBSCRIPTION) &&
            !user.all_roles.includes(ADMIN) && (
              <Button
                variant="contained"
                color="primary"
                className="mb-3 mt-3"
                type="button"
                onClick={() => {
                  history.push(`/claims/create`);
                }}
              >
                <AddIcon />
                <FormattedMessage
                  id="claims.add_claim"
                  defaultMessage="Add claim"
                />
              </Button>
            )}
        </div>
        <div>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={pages * limit}
            rowsPerPage={limit}
            page={page - 1}
            onChangePage={(_event, page) => {
              setPage(page + 1);
            }}
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
                    sort={sort}
                    thSort={item.sort}
                    onClick={() => {
                      const new_order =
                        order === 'asc' ? 'desc' : 'asc';
                      setSort(item.sort);
                      setOrder(new_order);
                    }}
                    order={order}
                    id={item.id}
                    sortDirection={
                      sort === item.sort && !!item.sort
                        ? order
                        : false
                    }
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
                  onClick={() =>
                    history.push(
                      generateLinkTr(client_id, item.id),
                    )
                  }
                />
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={pages * limit}
            rowsPerPage={limit}
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

Index.propTypes = {
  client_id: PropTypes.number.isRequired,
};

export default Index;
