import React from 'react';
import MainPage from './mainPage/MainPage.component';
import ClientsIndex from './mainPageClient/ClientsIndex.component';
import Show from './show.component';
import * as PropTypes from 'prop-types';

const Users = ({ id, action, client_id }) => {
  const UserRoute = ({ action, client_id, id }) => {
    switch (action) {
      case 'index':
        return <MainPage />;
      case 'users_index':
        return <ClientsIndex client_id={client_id} />;
      case 'users_client':
        return (
          <ClientsIndex
            client_id={client_id}
            action={action}
          />
        );
      case 'show':
        return <Show id={id} client_id={client_id} />;
      case 'users_show':
        return (
          <Show
            id={id}
            client_id={client_id}
            action={action}
          />
        );
    }
  };

  return (
    <UserRoute
      action={action}
      client_id={client_id}
      id={id}
    />
  );
};

export default Users;

Users.propTypes = {
  client_id: PropTypes.number,
  id: PropTypes.number,
  action: PropTypes.string.isRequired,
};
