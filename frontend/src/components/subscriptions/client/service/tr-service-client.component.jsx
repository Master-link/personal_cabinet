import React from "react";
import { connect } from 'react-redux';
import { setAction, setId, setRecord } from '../../../../redux/subscription/subscription.actions';
import { BeautyDatetime } from '../../../../utilities/beauty-datetime.utility';
import store from '../../../../redux/store';
import '../../../share/share.style.scss';
import BeautyActive from '../../../../utilities/beauty-active.utility';

const TrServiceClient = ({data, ...props}) => {

  const { setAction, setRecord, setId } = props;

  const showView = (id) => {
    setAction('client-service-show');
    const objIndex = store.getState().subscription.data.findIndex(obj => obj.id == id);
    setRecord(store.getState().subscription.data[objIndex]);
  }

  return(
    <>
      <tr className="pointer" onClick={()=>(showView(data.id))}>
          <td>
            <span onClick={() => {showView(data.id)}}>{data.id}</span>
          </td>
          <td>
            {data.tariff.name}
          </td>
          <td className="text-center">
            <BeautyDatetime datetime={data.started_at} />
          </td>
          <td className="text-center">
            <BeautyDatetime datetime={data.ended_at} />
          </td>
          <td className="text-center">
            <BeautyActive status={data.state} />
          </td>
      </tr>
    </>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    setRecord: action => dispatch(setRecord(action)),
    setAction: action => dispatch(setAction(action)),
    setId: id => dispatch(setId(id))
  }
}
export default connect(null, mapDispatchToProps)(TrServiceClient);