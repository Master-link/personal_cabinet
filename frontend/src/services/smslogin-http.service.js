import {
  getRequest,
  postRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from './generateFilterUrlParams';
import { messageI18n } from './intl/intl';

// список смс логинов
export const getData = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/sms_logins',
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

// создание смс логина
export const addSmsLogin = async (body) => {
  return await postRequest( process.env.REACT_APP_BACKEND + 
    '/sms_logins',
    body,
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const searchSmsLogins = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/sms_logins/search`,
      {
        ...getParams,
        ...generateFilterUrlParams(filterParams),
      },
    );
  } catch (error) {
    throw error;
  }
};

// поиск логинов для клиента
// client может быть: client_id или login
export const searchFreeSmsLogins = async (
  client_id,
  current_sms_login = null,
) => {
  const params = new URLSearchParams();
  if (client_id !== undefined && client_id !== null) {
    params.append('client_id', client_id);
  }
  params.append('current_sms_login', current_sms_login);

  return await getRequest( process.env.REACT_APP_BACKEND + 

      '/sms_logins/search_free',
    params,
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
