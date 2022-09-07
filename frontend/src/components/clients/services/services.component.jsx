import React from 'react';
import { connect } from 'react-redux';

import IndexForClients from './client/index.component';


const Services = ({ reduxId, reduxAction }) => {
  return (
    <>
      {process.env.NODE_ENV === 'development' ? <div><small>Компонент <b>services.component</b>: {reduxAction} - {reduxId}</small></div> : ''}
      {reduxAction === 'index-for-clients' ? <IndexForClients /> : ''}
    </>
  );
}

const mapStateToProps = state => {
  return {
    reduxId: state.service.id,
    reduxAction: state.service.action,
  }
}

export default connect(mapStateToProps)(Services);