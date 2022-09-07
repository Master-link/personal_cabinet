import Index from './index.component';
import { useParams } from 'react-router-dom';
import ShowTabs from './ShowTabs.component';

const Clients = ({ ...props }) => {
  const { action, client_id, controller } = useParams();

  return (
    <>
      {action === undefined ? <Index {...props} /> : ''}
      {action === 'show' && client_id > 0 ? (
        <ShowTabs
          action={action}
          controller="clients"
          client_id={client_id}
          {...props}
        />
      ) : (
        ''
      )}
      {action === 'edit' && client_id > 0 ? (
        <ShowTabs
          action={action}
          controller="clients"
          client_id={client_id}
          {...props}
        />
      ) : (
        ''
      )}
      {controller === 'users' && client_id > 0 ? (
        <ShowTabs
          controller="users"
          client_id={client_id}
          {...props}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Clients;
