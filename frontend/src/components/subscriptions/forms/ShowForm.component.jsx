import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  reduxForm,
  FieldArray,
  change,
  formValueSelector,
} from 'redux-form';
import store from '../../../redux/store';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import BeautyActive from '../../../utilities/beauty-active.utility';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { setRecord as setTariffState } from '../../../redux/tariff/tariff.actions';

import { getOperators } from '../../../services/operator-http.service';
import { searchSmsLogins } from '../../../services/smslogin-http.service';
import ShowSms from '../../../utilities/show-sms.utility';
import CheckedActive from '../../../utilities/checked-active.utility';

import {
  setData,
  setId,
} from '../../../redux/smslogin/smslogin.actions';
import { BeautyDatetime } from 'src/utilities/beauty-datetime.utility';
import 'react-datepicker/dist/react-datepicker.css';

const ShowForm = ({
  initialValues,
  service,
  reduxRecord,
  client_id,
  smslogins,
  smslogin,
  selected_tariff,
  ...props
}) => {
  const { setData, setSmslogin, setTariffState } = props;

  const [buldForm, setBuildForm] = useState(false);
  const [serviceInfo, setServiceInfo] = useState();
  const [tariff, setTariff] = useState();
  const [operators, setOperators] = useState([]);

  const started = initialValues.started_at
    ? moment(initialValues.started_at).toDate()
    : null;

  // Получить список операторов смс, если это сервис ТИП - смс гейт
  const fetchOperators = async (id = 0) => {
    await getOperators().then(({ data }) => {
      setOperators(data.data);
    });
  };

  // Получить список sms логинов клиента
  const fetchSmsLogins = async (client_id) => {
    try {
      const {
        data: { data },
      } = searchSmsLogins({ client_id });
      setData(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function fetch() {
      setBuildForm(false);
      await fetchOperators(); // подгружаем операторов связи
      await fetchSmsLogins(client_id); // подгружаем смс логины клиента
      setBuildForm(true);
    }
    fetch();

    setSmslogin(initialValues.jsondata.sms_login); // установить id выбранной смс в редусер
    setServiceInfo(initialValues.tariff.service);
    setTariff(initialValues.tariff);
    props.changeFieldValue('started_at', started);
    props.changeFieldValue('jsondata.renewal', false);
    props.changeFieldValue('jsondata.paid_on', null);
    props.changeFieldValue(
      'opsms_attributes',
      initialValues.opsms_attributes,
    );

    const HasBeenChangedState = (reduce, _state) => {
      props.changeFieldValue('jsondata.sms_login', reduce);
    };
    setTariffState(initialValues.tariff);
    const ReduxStateChangeListener = require('redux-state-change-listener');
    const stateCallbackManager = new ReduxStateChangeListener(
      store,
    );
    stateCallbackManager.register(
      (state) => state.smslogin.id,
      HasBeenChangedState,
      false,
    );
    stateCallbackManager.start();

    const selector = formValueSelector('editSubscription');
  }, []);

  if (buldForm) {
    return (
      <Table className="profile">
        <TableHead></TableHead>
        <TableBody>
          <TableRow key="subscription_status">
            <TableCell component="th">
              <FormattedMessage
                id="state"
                defaultMessage="State"
              />
              :
            </TableCell>
            <TableCell align="left">
              <BeautyActive status={initialValues.state} />
            </TableCell>
          </TableRow>
          <TableRow key="subscription_service">
            <TableCell component="th">
              <FormattedMessage
                id="service"
                defaultMessage="Service"
              />
              :
            </TableCell>
            <TableCell align="left">
              {initialValues.tariff.service.name}
            </TableCell>
          </TableRow>
          <TableRow key="subscription_tariff">
            <TableCell component="th">
              <FormattedMessage
                id="tariff"
                defaultMessage="Tariff"
              />
              :
            </TableCell>
            <TableCell align="left">
              {initialValues.tariff.name}
            </TableCell>
          </TableRow>
          <TableRow key="begin_subscription">
            <TableCell component="th">
              <FormattedMessage
                id="date_begin"
                defaultMessage="Begin of the subscription"
              />
              :
            </TableCell>
            <TableCell align="left">
              <BeautyDatetime
                datetime={initialValues.started_at}
                showTime
              />
            </TableCell>
          </TableRow>
          <TableRow key="final_subscription">
            <TableCell component="th">
              <FormattedMessage
                id="date_end"
                defaultMessage="Expired the subscription"
              />
              :
            </TableCell>
            <TableCell align="left">
              <BeautyDatetime
                datetime={initialValues.ended_at}
                showTime
              />
            </TableCell>
          </TableRow>
          <TableRow key="credit_subscription">
            <TableCell component="th">
              <FormattedMessage
                id="credit_limit"
                defaultMessage="Credit limit"
              />
              :
            </TableCell>
            <TableCell align="left">
              {initialValues.credit_limit}
            </TableCell>
          </TableRow>
          <TableRow key="renewal_subscription">
            <TableCell component="th">
              <FormattedMessage
                id="autorenew"
                defaultMessage="Prolong if sufficient funds are available"
              />
              :
            </TableCell>
            <TableCell align="left">
              <CheckedActive
                status={initialValues.renewal}
              />
            </TableCell>
          </TableRow>
          {initialValues.tariff &&
            initialValues.tariff.extra.changeable && (
              <TableRow key="subscribe_price_subscription">
                <TableCell component="th">
                  <FormattedMessage
                    id="subscribe.price"
                    defaultMessage="The subscription price"
                  />
                  :
                </TableCell>
                <TableCell align="left">
                  {initialValues.jsondata.subscribe_price}
                </TableCell>
              </TableRow>
            )}
          {/* Смс логины показываюся всем кроме Техподдержки */}
          {serviceInfo &&
            serviceInfo.ticket.kind === 'sms_gate' && (
              <TableRow key="smslogin_subscription">
                <TableCell component="th">
                  <FormattedMessage
                    id="smslogin"
                    defaultMessage="SMS login"
                  />
                  :
                </TableCell>
                <TableCell align="left">
                  {initialValues.jsondata.sms_login}
                </TableCell>
              </TableRow>
            )}
          {/* этот блок отвечает за показ формы добавления смс ресурсов к подписке */}
          {/* это аналогичный подход в создании/редактировании тарифов для sms_gate. TODO: надо избежать дублирования */}
          {/* отрабатывает только для sms_gate */}
          {tariff &&
            serviceInfo &&
            serviceInfo.ticket.kind === 'sms_gate' && (
              <TableRow key="tariff_smses">
                <TableCell
                  component="th"
                  style={{ verticalAlign: 'top' }}
                >
                  <FormattedMessage
                    id="sms.resources_for_subscription"
                    defaultMessage="Resources for the Subscription"
                  />
                  :
                </TableCell>
                <TableCell align="left">
                  <FieldArray
                    name="opsms_attributes"
                    component={ShowSms}
                    operators={operators}
                  />
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state) => {
  return {
    smslogins: state.smslogin.data,
    smslogin: state.smslogin.id,
    selected_tariff: state.tariff.record,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data) => dispatch(setData(data)), // установить список смс логинов
    setSmslogin: (id) => dispatch(setId(id)), // установить в редусере id смс логина
    setTariffState: (id) => dispatch(setTariffState(id)),
    changeFieldValue: function (field, value) {
      dispatch(change('editSubscription', field, value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'editSubscription',
  })(ShowForm),
);
