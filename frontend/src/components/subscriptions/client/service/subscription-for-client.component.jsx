import { useParams } from 'react-router-dom';
import ShowTabs from '../../../clients/ShowTabs.component';

const SubscriptionForClient = () => {
  const { client_id } = useParams();

  return (
    <ShowTabs
      controller="services"
      action="subscription_create"
      client_id={client_id}
    />
  );
};
export default SubscriptionForClient;
