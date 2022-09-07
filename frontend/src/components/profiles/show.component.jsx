import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getUser,
  putPassword,
} from '../../services/user-http.service';
import Button from '@material-ui/core/Button';
import CreateForm from './forms/create-form.component';
import { CurrentUser } from '../../utilities/current-user.utility';
import { useIntl, FormattedMessage } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Role from '../../utilities/role.utility';
import { breadcrumbsProfiles } from './breadcrumbsProfiles';
import { useSnackbar } from 'notistack';
import Myspinner from '../share/myspinner.component';
import { authenticationService } from '../../_services/authentication.service';
import { CurrentClient } from '../../utilities/current-client.utility';

const Show = () => {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState();
  const user = CurrentUser();
  const client = CurrentClient();

  const findClientId = () => {
    if (client) {
      return client.client.id;
    }
    return '';
  };

  const fetchData = (id) => {
    getUser(id, findClientId())
      .then((response) => {
        setData(response.data.user);
      })
      .then(() => {
        setDisabled(true);
      });
  };

  const changePassword = (data, user) => {
    putPassword(JSON.stringify(data))
      .then(() => {
        authenticationService.logout();
        enqueueSnackbar(
          intl.formatMessage(
            {
              id: 'changing_password_success',
              defaultMessage:
                'Password for {user} has been changed successfully',
            },
            { user: user.login },
          ),
          { variant: 'success' },
        );
      })
      .catch((error) => {
        handleClose();
        enqueueSnackbar(
          intl.formatMessage({
            id: 'error_change_password',
            defaultMessage: 'Error changing password',
          }),
          { variant: 'error' },
        );
      });
  };

  useEffect(() => {
    fetchData(user.id);
  }, []);

  useEffect(() => {
    if (data) {
      breadcrumbsProfiles(dispatch, data.name);
    }
  }, [data]);

  if (!disabled) {
    return <Myspinner />;
  }

  return (
    <>
      <div className="panel p_25-1_25-1">
        <Button
          variant="contained"
          color="primary"
          onClick={handleShow}
        >
          <FormattedMessage
            id="users.change_password"
            defaultMessage="Change password"
          />
        </Button>

        <Divider variant="middle" flexItem />
      </div>

      <Table className="profile">
        <TableHead></TableHead>
        <TableBody>
          <TableRow key="login">
            <TableCell component="th">
              <FormattedMessage
                id="users.login"
                defaultMessage="Login"
              />
            </TableCell>
            <TableCell align="left">{data.login}</TableCell>
          </TableRow>

          <TableRow key="fio">
            <TableCell component="th">
              <FormattedMessage
                id="users.fio"
                defaultMessage="FCs"
              />
            </TableCell>
            <TableCell align="left">{data.name}</TableCell>
          </TableRow>

          <TableRow key="fio">
            <TableCell component="th">
              <FormattedMessage
                id="users.phone"
                defaultMessage="Phone"
              />
            </TableCell>
            <TableCell align="left">
              {data.phone_number}
            </TableCell>
          </TableRow>

          <TableRow key="fio">
            <TableCell component="th">E-mail</TableCell>
            <TableCell align="left">{data.email}</TableCell>
          </TableRow>

          <TableRow key="fio">
            <TableCell component="th">
              <FormattedMessage
                id="role"
                defaultMessage="Role"
              />
            </TableCell>
            <TableCell align="left">
              <Role userRoles={data.roles} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Dialog
        key={`dialog-change-password`}
        open={show}
        onClose={handleClose}
        className="documentPopup"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage
            id="users.changing_password"
            defaultMessage={`Changing password for {user}`}
            values={{ user: data.login }}
          />
        </DialogTitle>
        <DialogContent>
          <CreateForm
            onSubmit={(postData) =>
              changePassword(postData, data)
            }
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Show;
