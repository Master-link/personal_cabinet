import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Myspinner from '../share/myspinner.component';
import { FormattedMessage } from 'react-intl';
import {
  setBreadcrumb,
  setActive,
} from 'src/redux/breadcrumbs/breadcrumbs.actions';
import { getSubscription } from 'src/services/subscription-http.service';
import {
  NEW,
  ACTIVE,
  SUSPEND,
  CLOSED,
  CONTINUE,
} from '../../constants/subscriptions';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import store from '../../redux/store';
import { getBalance } from '../../services/balance-http.service';
import { setActivated } from '../../redux/subscription/subscription.actions';
import { setBalance } from '../../redux/balance/balance.actions';
import Activate from '../../utilities/activate.component';
import SuspendSubscription from '../../utilities/suspend-subscription.component';
import CloseSubscription from '../../utilities/close-subscription.component';
import '../share/share.style.scss';
import ClientBalance from 'src/components/_helpers/Balance/ClientBalance.component';
import CreateTransaction from 'src/components/_helpers/Transaction/CreateTransaction';
import LeftTmSupport from 'src/utilities/left-tm-support.utility';
import SubscriptionFormContainer from './forms/SubscriptionForm.container';

const EditForService = ({
  id,
  client,
  service,
  dispatch,
  setBalance,
  setActive,
  setActivated,
  setBreadcrumb,
}) => {
  const [disabledClient, setDisabledClient] =
    useState(false);
  const [readOnly, setReadOnly] = useState([]);
  const [subscription, setSubscription] = useState();
  const [state, setState] = useState();

  // получить баланс
  const fetchServiceBalance = async (
    client_id,
    service_id,
  ) => {
    return await getBalance(client_id, service_id).then(
      (response) => {
        return response.data;
      },
    );
  };

  // получить инфо о текущей подписке
  const fetchSubscription = async (id) => {
    return await getSubscription(id)
      .then((response) => {
        setSubscription(response.data.subscription);
        setReadOnly(response.data.meta.read_only);
        setState(response.data.subscription.state);
        return response;
      })
      .then((response) => {
        return response.data.subscription;
      })
      .catch((error) => {
        console.log('Ошибка получения подписки');
      });
  };

  useEffect(() => {
    async function fetch() {
      const subscription = await fetchSubscription(id);

      const balance = await fetchServiceBalance(
        client.id,
        service.id,
      ).then((response) => {
        setBalance(response.balance);
        return response;
      });
      setActive('/');
      setBreadcrumb([
        {
          name: (
            <FormattedMessage
              id="main"
              defaultMessage="Main page"
            />
          ),
          to: '/',
        },
        {
          name: (
            <FormattedMessage
              id="client.name"
              defaultMessage="{client}"
              values={{
                client: `${client.name} ID ${client.crm.crm}`,
              }}
            />
          ),
          to: `/clients/edit/${client.id}`,
        },
        {
          name: (
            <FormattedMessage
              id="services"
              defaultMessage="Services"
            />
          ),
          to: `/clients/show/${client.id}/services`,
        },
        {
          name: (
            <FormattedMessage
              id="service.subscribes"
              defaultMessage="Subscriptions for {services}"
              values={{
                services: `${subscription.tariff.service.name}`,
              }}
            />
          ),
          to: `/clients/show/${client.id}/services/show/${service.id}/subscriptions`,
        },
        {
          name: (
            <FormattedMessage
              id="subscribe.editing"
              defaultMessage="Editing {tariff}"
              values={{
                tariff: `${subscription.tariff.name}`,
              }}
            />
          ),
        },
      ]);
      setDisabledClient(true);
      return { balance: balance };
    }
    fetch();

    // --- слушать изменения стейта state.subscription.activated - это сигнал, что нужно заново загрузить подписку ---
    let mounted = true;
    const HasBeenChangedState = (reduce, _state) => {
      console.log('x');
      if (mounted && reduce) {
        fetchSubscription(id).then((response) => {
          setActivated(false);
          setState(response.state);
        });
      }
    };
    const ReduxStateChangeListener = require('redux-state-change-listener');
    const stateCallbackManager =
      new ReduxStateChangeListener(store);
    stateCallbackManager.register(
      (state) => state.subscription.activated,
      HasBeenChangedState,
      false,
    );
    stateCallbackManager.start();
    return () => (mounted = false);
    // ---
  }, [
    id,
    client.id,
    client.name,
    service.id,
    setActive,
    setBreadcrumb,
    client.crm_id,
    setBalance,
  ]);

  if (disabledClient) {
    return (
      <>
        <div className="panel p_25-1_25-1">
          <div className="subpanel">
            <ClientBalance
              client_id={client.id}
              service_id={service.id}
            />
            {subscription.settings.hours && (
              <LeftTmSupport
                hours={~~(subscription.settings.hours / 60)}
                minutes={subscription.settings.hours % 60}
              />
            )}
            {subscription.state !== CLOSED && (
              <Button
                variant="contained"
                color="primary"
                className="ml-4 mr-2"
                onClick={() =>
                  dispatch(submit('editSubscription'))
                }
              >
                <FormattedMessage
                  id="update"
                  defaultMessage="Update"
                />
              </Button>
            )}
            {(subscription.state === ACTIVE ||
              subscription.state === SUSPEND) && (
              <div className="ml-4 mr-2">
                <SuspendSubscription
                  subscription={subscription}
                />
              </div>
            )}
            {subscription.state !== CLOSED && (
              <div className="ml-4 mr-2">
                <CloseSubscription
                  subscription={subscription}
                />
              </div>
            )}
            {[NEW, CONTINUE].includes(
              subscription.state,
            ) && (
              <div className="ml-4 mr-2">
                <Activate subscription={subscription} />
              </div>
            )}
            {subscription.state !== CLOSED && (
              <div className="ml-4 mr-2">
                <CreateTransaction
                  clientId={client.id}
                  serviceId={service.id}
                />
              </div>
            )}
          </div>
        </div>

        <SubscriptionFormContainer
          approvingClaim={() => {}}
          initialValues={subscription}
          client_id={client.id}
          crm={client.crm.crm}
          readOnly={readOnly}
        />
      </>
    );
  } else {
    return <Myspinner />;
  }
};

const mapStateToProps = (state) => {
  return {
    reduxRecordService: state.subscription.record,
    balance: state.balances.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBalance: (data) => dispatch(setBalance(data)),
    resetForm: (action) => dispatch(reset(action)),
    setBreadcrumb: (data) => dispatch(setBreadcrumb(data)),
    setActivated: (flag) => dispatch(setActivated(flag)),
    setActive: (active) => dispatch(setActive(active)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForService);
