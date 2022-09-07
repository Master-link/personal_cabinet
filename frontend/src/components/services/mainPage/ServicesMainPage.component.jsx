import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Myspinner from '../../share/myspinner.component';
import { getListServices } from 'src/services/service-http.service';
import 'font-awesome/css/font-awesome.min.css';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { thIndex } from './thIndex';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import TableHead from '@material-ui/core/TableHead';
import { StyledTableCell } from '../../_helpers/StyledTableCell';
import { PermissionsUtility } from '../../../utilities/permissions.utility';
import { ADD_SERVICE } from '../../../constants/permissions';
import Button from '@material-ui/core/Button';
import BeautyActive from '../../../utilities/beauty-active.utility';
import { breadcrumbsServices } from './breadcrumbsServices';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';

const ServicesMainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('services.name');
  const [order, setOrder] = useState('asc');
  const limit = 15;
  const [pages, setPages] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    getListServices(
      {
        page: page + 1,
        sort: sort,
        order: order,
        limit: limit,
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

  const onClickTr = (id) => {
    history.push(`/services/show/${id}`);
  };

  useEffect(() => {
    fetchData();
    breadcrumbsServices(dispatch);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, sort, order]);

  return (
    <>
      {!disabled && <Myspinner />}
      <div>
        <div className="panel p_25-1_25-1">
          <div className="subpanel">
            {PermissionsUtility(ADD_SERVICE) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(`/services/create`);
                }}
              >
                <FormattedMessage
                  id="service.to_create"
                  defaultMessage="+ Create a service"
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
              page={page}
              onChangePage={(_event, p) => {
                setPage(p);
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
                  <StyledTableRow
                    hover
                    key={index}
                    onClick={() => {
                      onClickTr(item.id);
                    }}
                    className="pointer"
                  >
                    <StyledTableCell
                      align="left"
                      className="grided_cell"
                    >
                      <div className="overflowed">
                        {item.name}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.currency.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <BeautyActive status={item.state} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={pages * limit}
              rowsPerPage={limit}
              page={page}
              onChangePage={(_event, p) => {
                setPage(p);
              }}
            />
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

export default ServicesMainPage;
