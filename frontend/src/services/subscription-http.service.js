import {
  getRequest,
  deleteRequest,
  postRequest,
  putRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from './generateFilterUrlParams';

// список подписок
export const getSubscriptions = async (
  page,
  sort,
  order,
  limit,
  client_id,
  service_id,
) => {
  const params = new URLSearchParams();
  params.append('page', page);
  params.append('sort', sort);
  params.append('order', order);
  params.append('limit', limit);
  if (client_id !== undefined && client_id !== null) {
    params.append('filter[client_id]', client_id);
  }
  if (service_id !== undefined && service_id !== null) {
    params.append(
      'filter[tariffs][service_id]',
      service_id,
    );
  }

  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/subscriptions',
      params,
    );
  } catch (error) {
    throw error;
  }
};

export const getSubscription = async (id) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        '/subscriptions/' +
        id,
    );
  } catch (error) {
    throw error;
  }
};

export const putAutoContinueActivation = async (
  id,
  client_id,
) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 
      `/subscriptions/${id}/client/${client_id}/auto_continue`,
    );
  } catch (error) {
    throw error;
  }
};

export const getTmSubscription = async (
  client_id,
  service_id,
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/subscriptions/clients/${client_id}/services/${service_id}/tmsupport`,
    );
  } catch (error) {
    throw error;
  }
};

export const getClosedAndRenewedSubscriptions = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/subscriptions/closed_and_renewed`,
      {
        ...getParams,
        ...generateFilterUrlParams(filterParams),
      },
    );
  } catch (error) {
    throw error;
  }
};

export const getClosedAndRenewedDetails = async (id) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/subscriptions/closed_and_renewed_details/${id}`,
    );
  } catch (error) {
    throw error;
  }
};

// Платежные системы для клиента
export const getRegisteredPaymentSystems = async (
  client_id,
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        '/subscriptions/client/' +
        client_id +
        '/pay_systems',
    );
  } catch (error) {
    throw error;
  }
};

// удаление подписки
export const deleteSubscription = async (id) => {
  try {
    return await deleteRequest( process.env.REACT_APP_BACKEND + 

        '/subscriptions/' +
        id,
    );
  } catch (error) {
    throw error;
  }
};

// создание подписки
export const postSubscription = async (body) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      '/subscriptions',
      body,
    );
  } catch (error) {
    throw error;
  }
};

// обновление подписки
export const putSubscription = async (id, body) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 

        '/subscriptions/' +
        id,
      body,
    );
  } catch (error) {
    throw error;
  }
};

// закрытие подписки, передается дата закрытия
export const closeSubscription = async (id, body) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 

        '/subscriptions/' +
        id +
        '/close',
      body,
    );
  } catch (error) {
    throw error;
  }
};

// обновить минуты тм саппорта
export const putMinutes = async (
  client_id,
  service_id,
  data,
) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 

        '/subscriptions/client/' +
        client_id +
        '/service/' +
        service_id,
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const activateSubscribe = async (id, data) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 
      `/subscriptions/${id}/activate`,
      data,
    );
  } catch (error) {
    throw error;
  }
};

// обновить минуты тм саппорта
export const postMinutes = async (
  client_id,
  service_id,
  data,
) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 

        '/subscriptions/client/' +
        client_id +
        '/service/' +
        service_id,
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const getActiveSubscribesByService = async (
  client_id,
  service_id,
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        `/subscriptions/client/${client_id}/active/${service_id}`,
    );
  } catch (error) {
    throw error;
  }
};

// 1 подписка
export const getActiveTmSubscription = async (
  client_id,
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        `/subscriptions/fetch_active_tmsupport/${client_id}`,
    );
  } catch (error) {
    throw error;
  }
};
