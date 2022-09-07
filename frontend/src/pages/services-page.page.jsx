import React from 'react';
import './homepage.style.scss';
import Services from '../components/services/services.component';
import { useParams } from 'react-router-dom';

const ServicesPage = (props) => {
  let { action, id } = useParams();

  return (
    <div>
      <Services action={action} id={id} {...props} />
    </div>
  );
};

export default ServicesPage;
