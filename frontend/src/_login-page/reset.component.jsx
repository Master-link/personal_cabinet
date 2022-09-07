import React, { useState } from 'react';
import ResetForm from './reset-form.component';
import { Link } from 'react-router-dom';
import { postRequest } from '../_services/http-request';
import { useSnackbar } from 'notistack';
import './login-page.scss';

const Reset = ({onSwitchLogin, ...props}) => {

  const [scs, setScs] = useState('');
  const [err, setErr] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const postData = async (values) => {
    setScs('Отправка запроса ...');
    await postRequest(process.env.REACT_APP_BACKEND + '/password/forgot', values)
      .then((response) => {
        setScs('Запрос на изменение пароля отправлен, проверьте почту');
        setTimeout(() => {props.history.push('/login'); }, 900);
      })
      .catch(error => {
        setScs('');
        setErr(error.message);
        setTimeout(() => { setErr('') }, 2000);
      });
  }

  const posdData = async(values) => {
    await postData(JSON.stringify(values));
    await onSwitchLogin();
    await enqueueSnackbar(
      "На Вашу отправлена ссылка сброса пароля, сбрасывайте пароль и авторизуйтесь с логином и новым паролем", 
      {variant: 'success'}
    );
  }

  return(
    <>
      <div id="h100 setpass">
          <div>
            <h6 className="font-weight-bold mt-5 bt-3">Запрос на восстановление пароля</h6>
            <ResetForm onSubmit={posdData} />
          </div>
          <div className="mt-3">
            <Link 
            to="#" 
            onClick={onSwitchLogin} 
            className='restore-module__link_open restore-module__link text-small'>
              Я вспомнил пароль
            </Link>
          </div>
      </div>
    </>
  )
}
export default Reset;