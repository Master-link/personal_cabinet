import React from 'react';
import './homepage.style.scss';
import Users from '../components/users/users.component';
import { useParams } from 'react-router-dom';

const UsersPage = ({ ...props }) => {
  let { action, id } = useParams();

  return (
    <div>
      <Users action={action} id={id} {...props} />
    </div>
  );
};

export default UsersPage;
