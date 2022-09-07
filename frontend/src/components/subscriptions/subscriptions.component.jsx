import IndexClient from './client/service/index-client.component';
import IndexClientClient from './client/service/index-client-client.component';
import EditForService from './edit-for-services.component';
import Show from './show.component';
import * as PropTypes from 'prop-types';

const Subscriptions = ({
  client,
  service,
  subaction,
  subaction_id,
}) => (
  <>
    {subaction === 'services_index_client' && (
      <IndexClientClient
        client={client}
        service={service}
      />
    )}
    {subaction === undefined && (
      <IndexClient client={client} service={service} />
    )}
    {subaction === 'edit' && subaction_id > 0 && (
      <EditForService
        id={subaction_id}
        client={client}
        service={service}
      />
    )}
    {subaction === 'services_client' &&
      subaction_id > 0 && (
        <Show
          id={subaction_id}
          client={client}
          service={service}
        />
      )}
  </>
);

Subscriptions.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    crm: PropTypes.shape({
      crm: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  subaction: PropTypes.string.isRequired,
  subaction_id: PropTypes.string.isRequired,
};

export default Subscriptions;
