import React from 'react';
import './homepage.style.scss';
import Users from '../components/users/users.component';
import {
  useParams
} from "react-router-dom";

const UsersClientPage = ({action, client_id, ...props}) => {

  let { id } = useParams();

  return(
    <div>
      <Users action={action} id={id} client_id={client_id} {...props}/>
    </div>
  );
}

export default UsersClientPage;