import React from 'react';
import './homepage.style.scss';
import Tariffs from '../components/tariffs/tariffs.component';
import {
  withRouter,
  useParams
} from "react-router-dom";

const TariffsPage = ({action, ...props}) => {

  let { service_id, id } = useParams();

  return(
    <div>
      <Tariffs action={action} service_id={service_id} id={id} {...props} />
    </div>
  );
}

export default TariffsPage;