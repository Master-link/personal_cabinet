import LeftTmSupport from '../../../utilities/left-tm-support.utility';
import { getTmSubscription } from '../../../services/subscription-http.service';
import { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { getBalance } from '../../../services/balance-http.service';

export const TmSupportWidget = ({
  client_id,
  service_id,
}) => {
  const [tmBuys, setTmBuys] = useState({
    hours: null,
    minutes: null,
    overtime: null,
    tmSupportIsPresent: null,
    serviceBalanceId: null,
  });
  const [timestamp, setTimestamp] = useState(new Date());

  const fetchTmSubscription = async () => {
    try {
      const {
        data: {
          hours,
          minutes,
          id: tmSupportIsPresent,
          overtime_price,
        },
      } = await getTmSubscription(client_id, service_id);
      const data = {
        hours: hours,
        minutes: minutes,
        tmSupportIsPresent: tmSupportIsPresent,
        overtime: overtime_price,
      };
      setTmBuys({ ...tmBuys, data });
      return data;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const fetchServiceBalance = async () => {
    try {
      const { data } = await getBalance(
        client_id,
        service_id,
      );
      return {
        serviceBalanceId: data,
      };
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  useEffect(async () => {
    const tm_hours = await fetchTmSubscription();
    const tm_balance = await fetchServiceBalance();
    setTmBuys({ ...tm_hours, ...tm_balance });
  }, [timestamp]);

  if (!tmBuys.serviceBalanceId) return <></>;

  return (
    <>
      {tmBuys.tmSupportIsPresent && (
        <>
          <div className="ml-4 mr-2">
            <LeftTmSupport
              client_id={client_id}
              service_id={service_id}
              hours={tmBuys.hours}
              minutes={tmBuys.minutes}
            />
          </div>
        </>
      )}
    </>
  );
};

TmSupportWidget.propTypes = {
  client_id: PropTypes.string.isRequired,
  service_id: PropTypes.string.isRequired,
};
