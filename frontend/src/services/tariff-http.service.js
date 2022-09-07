import {
  getRequest,
  putRequest,
  postRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from 'src/services/generateFilterUrlParams';
import { messageI18n } from 'src/services/intl/intl';

export const getTariffs = async (
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
    params.append('filter[service_id]', service_id);
  }

  return await getRequest( process.env.REACT_APP_BACKEND + 
    '/tariffs',
    params,
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error('Ошибка получения списка тарифов');
    });
};

export const getTariff = async (id) => {
  return await getRequest( process.env.REACT_APP_BACKEND + 
    '/tariffs/' + id,
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const postTariff = async (body) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      `/tariffs`,
      body,
    );
  } catch (e) {
    throw new Error(
      `${messageI18n(
        'save_error',
        `Fail saving: {message}`,
        {
          message: e.response.data.message,
        },
      )}`,
    );
  }
};

export const putTariff = async (id, body) => {
  return await putRequest( process.env.REACT_APP_BACKEND + 
    '/tariffs/' + id,
    body,
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const searchAvailableTariffs = async (
  clientId,
  serviceId,
  getParams = {},
  filterParams = {},
) => {
  return await getRequest( process.env.REACT_APP_BACKEND + 

      `/clients/${clientId}/search/${serviceId}/available_tariffs`,
    {
      ...getParams,
      ...generateFilterUrlParams(filterParams),
    },
  );
};

export const getTariffesForService = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        `/tariffs/search_autocomplete`,
      {
        ...getParams,
        ...generateFilterUrlParams(filterParams),
      },
    );
  } catch {
    throw new Error(
      `${messageI18n(
        'back.error_getting_data',
        'Error getting data',
      )}`,
    );
  }
};

export const getCountActiveSubscriptions = async (id) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/tariffs/${id}/count_active_subscriptions`,
    );
  } catch (error) {
    throw error;
  }
};

export const postCreateSubscriptionDuplicates = async (
  body,
) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      `/tariffs/create_subscription_duplicates`,
      body,
    );
  } catch (e) {
    throw new Error(
      `${messageI18n(
        'save_error',
        `Fail saving: {message}`,
        {
          message: e.response.data.message,
        },
      )}`,
    );
  }
};
