import {
  getRequest,
  putRequest,
} from '../_services/http-request.js';

// получить баланс для клиента и выбранного сервиса
export const getBalance = async (client_id, service_id) => {
  const params = new URLSearchParams();
  params.append('client_id', client_id);
  params.append('service_id', service_id);

  return await getRequest( process.env.REACT_APP_BACKEND + 

      '/service_balances/show_by_params',
    params,
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};