import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setId,
  setAction,
} from '../../../redux/service/service.actions';
import Button from '@material-ui/core/Button';
import { Field, reduxForm, change } from 'redux-form';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MenuItem from '@material-ui/core/MenuItem';
import { FormattedHTMLMessage } from 'react-intl';
import Select from '@material-ui/core/Select';
import { useSnackbar } from 'notistack';
import { useIntl, FormattedMessage } from 'react-intl';
import { getCrmEmployeeManagers } from '../../../services/crm-employees-http.service';

const EditForm = ({ initialValues, ...props }) => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, pristine, submitting } = props;
  const [buildForm, setBuildForm] = useState(false);
  const [managers, setManagers] = useState();
  const [manager, setManager] = useState();

  const fetchEmployers = async () => {
    return getCrmEmployeeManagers()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      });
  };

  // установка менеджера
  const setFormManager = (manager) => {
    setManager(manager);
    props.changeFieldValue('employee_id', manager);
  };

  // инициализация манагеров
  useEffect(() => {
    async function fetch() {
      await fetchEmployers().then((response) => {
        setManagers(response.data);
      }); // подгружаем менеджеров
      await setManager(initialValues.employee_id);

      await setBuildForm(true);
    }

    fetch();
  }, []);

  if (buildForm) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="panel p_25-1_25-1">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={pristine || submitting}
          >
            Обновить
          </Button>
        </div>

        <Table className="profile ">
          <TableHead></TableHead>
          <TableBody>
            <TableRow key="crm_id">
              <TableCell component="th">CRM ID:</TableCell>
              <TableCell align="left">
                {initialValues.crm.crm}
              </TableCell>
            </TableRow>

            <TableRow key="1cid">
              <TableCell component="th">1C ID:</TableCell>
              <TableCell align="left">
                <div>
                  <Field
                    name="settings.one_c_id"
                    type="input"
                    component="input"
                    placeholder="1C ID"
                    className="form-control"
                  />
                </div>
              </TableCell>
            </TableRow>

            <TableRow key="client_name">
              <TableCell component="th">
                <FormattedMessage
                  id="name"
                  defaultMessage="Name"
                />
                :
              </TableCell>
              <TableCell align="left">
                <div>
                  <Field
                    name="name"
                    type="input"
                    component="input"
                    placeholder={intl.formatMessage({
                      id: 'name',
                      defaultMessage: 'Name',
                    })}
                    className="form-control"
                  />
                </div>
              </TableCell>
            </TableRow>

            <TableRow key="organization">
              <TableCell component="th">
                <FormattedMessage
                  id="organization"
                  defaultMessage="Organization"
                />
                :
              </TableCell>
              <TableCell align="left">
                <div>
                  <Field
                    name="organization"
                    type="input"
                    component="input"
                    placeholder={intl.formatMessage({
                      id: 'organization',
                      defaultMessage: 'Organization',
                    })}
                    className="form-control"
                  />
                </div>
              </TableCell>
            </TableRow>

            <TableRow key="email">
              <TableCell component="th">Email:</TableCell>
              <TableCell align="left">
                <div>
                  <Field
                    name="email"
                    type="input"
                    component="input"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
              </TableCell>
            </TableRow>

            <TableRow key="country">
              <TableCell component="th">
                <FormattedMessage
                  id="country"
                  defaultMessage="Country"
                />
                :
              </TableCell>
              <TableCell align="left">
                {initialValues.country.name}
              </TableCell>
            </TableRow>

            <TableRow key="city">
              <TableCell component="th">
                <FormattedMessage
                  id="city"
                  defaultMessage="City"
                />
                :
              </TableCell>
              <TableCell align="left">
                {initialValues.settings.city}
              </TableCell>
            </TableRow>

            <TableRow key="hour_zone">
              <TableCell component="th">
                <FormattedMessage
                  id="time_zone"
                  defaultMessage="Time zone"
                />
                :
              </TableCell>
              <TableCell align="left">
                {initialValues.settings.utc_offset}
              </TableCell>
            </TableRow>

            <TableRow key="users.crm_manager">
              <TableCell component="th">
                <FormattedHTMLMessage
                  id="crm_manager"
                  defaultMessage="CRM manager"
                />
              </TableCell>
              <TableCell align="left">
                <Select
                  className="form-control"
                  defaultValue={manager}
                  onChange={(v, _e) =>
                    setFormManager(v.target.value)
                  }
                >
                  {managers.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="profile">
          <TableHead></TableHead>
          <TableBody>
            <TableRow key="cialert_emailsty">
              <TableCell component="th">
                Email адреса для уведомлений:
              </TableCell>
              <TableCell align="left">
                <div>
                  <Field
                    name="settings.alert_emails"
                    type="input"
                    component="input"
                    placeholder="Email адреса для уведомлений"
                    className="form-control"
                  />
                </div>
              </TableCell>
            </TableRow>

            <TableRow key="alert_phone">
              <TableCell component="th">
                Номер телефона для уведомлений:
              </TableCell>
              <TableCell align="left">
                <div>
                  <Field
                    name="settings.alert_phone"
                    type="input"
                    component="input"
                    placeholder="Номер телефона для уведомлений"
                    className="form-control"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAction: (action) => dispatch(setAction(action)),
    setId: (id) => dispatch(setId(id)),
    changeFieldValue: function (field, value) {
      dispatch(change('editService', field, value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({ form: 'editService' })(EditForm));
