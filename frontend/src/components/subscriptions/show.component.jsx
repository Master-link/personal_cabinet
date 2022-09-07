import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ShowForm from './forms/ShowForm.component';
import { FormattedMessage } from 'react-intl';
import {
  setBreadcrumb,
  setActive,
} from '../../redux/breadcrumbs/breadcrumbs.actions';
import { getSubscription } from '../../services/subscription-http.service';
import '../share/share.style.scss';

const Show = ({
  id,
  client,
  service,
  setActive,
  setBreadcrumb,
}) => {
  const [disabledClient, setDisabledClient] = useState(
    false,
  );

  const [subscription, setSubscription] = useState();

  const fetchSubscription = async (id) => {
    return await getSubscription(id)
      .then((response) => {
        setSubscription(response.data.subscription);
        return response;
      })
      .then((response) => {
        return response.data.subscription;
      })
      .catch((error) => {
        console.log('Ошибка получения подписки');
      });
  };

  useEffect(async () => {
    const subscription = await fetchSubscription(id);
    setActive('/services_client');
    setBreadcrumb([
      {
        name: (
          <FormattedMessage
            id="services"
            defaultMessage="Services"
          />
        ),
        to: '/services_client',
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
        to: `/services_client/show/${service.id}/subscriptions`,
      },
      { name: `${subscription.tariff.name}` },
    ]);
    setDisabledClient(true);
  }, []);

  if (!disabledClient) {
    return <></>;
  }

  return (
    <ShowForm
      initialValues={subscription}
      client_id={client.id}
      service={service}
      onSubmit={() => {}}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: (data) => dispatch(setBreadcrumb(data)),
    setActive: (active) => dispatch(setActive(active)),
  };
};

export default connect(null, mapDispatchToProps)(Show);
