import React from 'react';
import './homepage.style.scss';
import Clients from '../components/clients/clients.component';

const ClientsPage = (props) => (
  <div>
    <Clients {...props} />
  </div>
)

export default ClientsPage;