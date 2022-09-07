import React from 'react';
import { useSnackbar } from 'notistack';


const PaymentFailPage = ({...props}) => {
  props.history.push('/');
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar( "Ошибка проведения платежа",  {variant: 'error'} );
  
  return <div>
    <></>
  </div>
}
export default PaymentFailPage;