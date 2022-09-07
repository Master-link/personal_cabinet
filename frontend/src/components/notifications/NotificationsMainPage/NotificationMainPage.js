import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Myspinner from '../../share/myspinner.component';
import cn from 'classnames';
import { generateUrlSearchPath } from '../../../utilities/generateUrlSearchPath';
import Paginator from '../../../utilities/paginator.utility';
import { useHistory, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { breadcrumbsNotificationMainPage } from '../functions/breadcrumbsNotificationMainPage';
import {
  getNotifications,
  patchNtfMessageAll,
} from '../../../services/ntf-http.service';
import { thNotifications } from './thNotifications';
import { Tr } from './Tr.component';
import SearchFormContainer from '../searchForm/SearchForm.container';
import { ButtonUI } from '../../../ui/prepared';
import SnackbarUtils from '../../../utilities/SnackbarUtils';
import { setPostNotifications } from '../../../redux/notification/notification.actions';
import * as PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { LIMIT } from '../../../constants/tableParams';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';

const NotificationMainPage = ({
  notificationsInStore,
  setPostNotifications,
}) => {
  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();

  const [notifications, setNotifications] = useState({
    data: [],
    readMessages: [],
    pages: 1,
  });

  const [loaded, setLoaded] = useState(false);

  const page = query.get('page') || 1;
  const sort = query.get('sort') || 'id';
  const order = query.get('order') || 'desc';
  const category = query.get('category') || 'null';

  const onReadAll = async () => {
    try {
      await patchNtfMessageAll();
      setPostNotifications([]);
      SnackbarUtils.success(
        intl.formatMessage({
          id: 'success',
          defaultMessage: 'Success',
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const fetchNotifications = async () => {
    setLoaded(false);
    try {
      const {
        data: {
          messages,
          meta: { total_pages, read_messages },
        },
      } = await getNotifications(
        {
          page: page,
          sort: sort,
          order: order,
        },
        {
          category_id: category,
        },
      );
      setNotifications({
        data: messages,
        readMessages: read_messages,
        pages: total_pages,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const paginationProps = {
    rowsPerPageOptions: [],
    component: 'div',
    count: notifications.pages * LIMIT,
    rowsPerPage: LIMIT,
    page: page - 1,
    onChangePage: (_event, page) => {
      const newLink = {
        pathname: '/notifications',
        search: generateUrlSearchPath({
          page: page + 1,
          category,
        }),
      };
      history.push(newLink);
    },
  };

  useEffect(() => {
    breadcrumbsNotificationMainPage(dispatch);
  }, [dispatch]);

  useEffect(async () => {
    await fetchNotifications();
  }, [page, sort, order, category]);

  return (
    <>
      {!loaded && <Myspinner />}

      <div className={cn('flexbox', 'ml-2', 'mr-2')}>
        <div
          className={cn('flex-container', 'mt-2', 'mb-1')}
        >
          {notificationsInStore.length > 0 && (
            <ButtonUI
              text={
                <FormattedMessage
                  id="readall"
                  defaultMessage="Read all"
                />
              }
              onClick={async () => {
                await onReadAll();
                await fetchNotifications();
              }}
            />
          )}
          <SearchFormContainer
            onSubmitProp={({ category = '' }) => {
              const newLink = {
                pathname: '/notifications',
                search: generateUrlSearchPath({
                  page: 1,
                  category,
                }),
              };
              history.push(newLink);
            }}
            category={category}
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
                {thNotifications.map((item, index) => (
                  <RenderThMaterial
                    key={index}
                    sort={sort}
                    thSort={item.sort}
                    onClick={() => {}}
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
              {notifications.data.map(
                (
                  {
                    id,
                    message,
                    link,
                    created_at,
                    category: { title },
                  },
                  index,
                ) => (
                  <Tr
                    key={index}
                    id={id}
                    message={message}
                    categoryTitle={intl.formatMessage({
                      id: title,
                      defaultMessage: title,
                    })}
                    created_at={created_at}
                    isReadMessage={notifications.readMessages.includes(
                      id,
                    )}
                    onClick={() => {
                      history.push(link);
                    }}
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

const mapStateToProps = (state) => {
  return {
    notificationsInStore: state.notification.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPostNotifications: (payload) =>
      dispatch(setPostNotifications(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationMainPage);

NotificationMainPage.propTypes = {
  setPostNotifications: PropTypes.func.isRequired,
};
