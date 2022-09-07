import React from 'react';
import { useSnackbar } from 'notistack';


const PaymentSuccessPage = ({...props}) => {
  props.history.push('/');
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar( "Платеж прошел успешно",  {variant: 'success'} );
  
  return <div>
    <></>
  </div>
}
export default PaymentSuccessPage;