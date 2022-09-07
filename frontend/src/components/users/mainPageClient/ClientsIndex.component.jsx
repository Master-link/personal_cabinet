import { useState, useEffect } from 'react';
import Myspinner from '../../share/myspinner.component';
import { getUsers } from '../../../services/user-http.service';
import { useHistory } from 'react-router-dom';
import '../../share/share.style.scss';
import { LIMIT } from '../../../constants/tableParams';
import { Tr } from './Tr.component';
import { breadcrumbsUsers } from './breadcrumbsUsers';
import { useDispatch } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';
import TableHead from '@material-ui/core/TableHead';
import { indexTh } from './indexTh';
import * as PropTypes from 'prop-types';
import { PermissionsUtility } from '../../../utilities/permissions.utility';
import { CREATE_USER } from '../../../constants/permissions';
import { ButtonUI } from '../../../ui/prepared';
import { CurrentUser } from '../../../utilities/current-user.utility';
import { DIRECTOR } from '../../../constants/roles';

const ClientsIndex = ({ client_id, action }) => {
  const user = CurrentUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const page = 1;
  const sort = 'id';
  const order = 'desc';
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setDisabled(false);
    try {
      const {
        data: { users },
      } = await getUsers(
        {
          page: page,
          sort: sort,
          order: order,
          limit: LIMIT,
        },
        {
          client_id: client_id,
        },
      );
      setData(users);
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(true);
    }
  };

  const onClickTr = (id) => {
    if (action === 'users_client') {
      return history.push(`/users_client/show/${id}`);
    }
    return history.push(
      `/clients/show/${client_id}/users/show/${id}`,
    );
  };

  useEffect(() => {
    fetchData();
    breadcrumbsUsers(dispatch, client_id, action);
  }, []);

  if (!disabled) {
    return <Myspinner />;
  }

  return (
    <>
      <div
        className="pt-2 pb-2 pl-3 pr-3 panel-white"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {PermissionsUtility(CREATE_USER) && (
          <ButtonUI
            variant="contained"
            color="primary"
            onClick={() => {
              if (user.role === DIRECTOR) {
                history.push(`/users_client/create`);
              } else {
                history.push(
                  `/clients/show/${client_id}/users/create`,
                );
              }
            }}
            text="+ Новый пользователь"
          />
        )}
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
              {data.map((item, index) => (
                <Tr
                  email={item.email}
                  key={index}
                  name={item.name}
                  onClickTr={() => onClickTr(item.id)}
                  phone_number={item.phone_number}
                  roles={item.roles}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

ClientsIndex.propTypes = {
  client_id: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default ClientsIndex;
