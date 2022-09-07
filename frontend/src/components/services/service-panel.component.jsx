import Activate from '../../utilities/activate.component';
import SmsLogin from '../../utilities/sms-login.component';
import SuspendSubscription from '../../utilities/suspend-subscription.component';
import CloseSubscription from '../../utilities/close-subscription.component';
import Techsupport from '../../utilities/techsupport.component';
import Button from '@material-ui/core/Button';
import LeftTmSupport from '../../utilities/left-tm-support.utility';
import {
  NEW,
  ACTIVE,
  SUSPEND,
  CLOSED,
} from '../../constants/subscriptions';
import ClientBalance from 'src/components/_helpers/Balance/ClientBalance.component';
import CreateTransaction from 'src/components/_helpers/Transaction/CreateTransaction';
import { useHistory } from 'react-router-dom';

const ServicePanel = ({
  client,
  service,
  subscription,
  hours,
  minutes,
}) => {
  const history = useHistory();
  return (
    <div className="panel p_25-1_25-1">
      <div className="subpanel">
        <ClientBalance
          service_id={service.id}
          client_id={client.id}
        />
        {hours !== null && hours !== undefined ? (
          <>
            <div className="ml-4 mr-2">
              <LeftTmSupport
                client_id={client.id}
                service_id={service.id}
                hours={hours}
                minutes={minutes}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        {subscription ? (
          <>
            {subscription.state !== CLOSED && (
              <div className="ml-4 mr-2">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push(
                      `/clients/show/${subscription.client_id}/services/show/${subscription.tariff.service_id}/subscriptions/edit/${subscription.id}`,
                    );
                  }}
                >
                  Редактировать
                </Button>
              </div>
            )}

            {subscription.state !== CLOSED &&
              subscription.tariff.service.ticket.kind ===
                'sms_gate' && (
                <div className="ml-4 mr-2">
                  <SmsLogin
                    subscription_id={subscription}
                  />
                </div>
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

            {subscription.state === NEW && (
              <div className="ml-4 mr-2">
                <Activate subscription={subscription} />
              </div>
            )}

            {subscription.state !== CLOSED &&
              subscription.tariff.service.ticket.kind ===
                'tech_support' && (
                <div className="ml-4 mr-2">
                  <Techsupport
                    subscription={subscription}
                  />
                </div>
              )}
          </>
        ) : (
          ''
        )}
        {
          // если есть подписка и не закрыта либо нет подписки
          (service !== undefined &&
            subscription !== undefined &&
            subscription.state !== 'state_closed') ||
          !subscription ? (
            <div className="ml-4 mr-2">
              <CreateTransaction
                clientId={client.id}
                serviceId={service.id}
              />
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  );
};

export default ServicePanel;
