import {
  getRequest,
  putRequest,
  postRequest,
} from 'src/_services/http-request.js';
import { generateFilterUrlParams } from './generateFilterUrlParams';
import { messageI18n } from './intl/intl';

export const getServices = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/services',
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

export const getListServices = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        '/services/list_services',
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

export const getServicesList = async () => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/services/list',
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

export const getService = async (id) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/services/${id}`,
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

export const getServicesForClient = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        `/services/search_autocomplete`,
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

export const putService = async (id, body) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 
      `/services/${id}`,
      body,
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

export const postService = async (body) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      '/services',
      body,
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

export const searchService = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        '/services/search_autocomplete_active_subscriptions',
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

export const searchAvailableServices = async (
  clientId,
  getParams = {},
  filterParams = {},
) => {
  return await getRequest( process.env.REACT_APP_BACKEND + 

      `/clients/${clientId}/search_available_services`,
    {
      ...getParams,
      ...generateFilterUrlParams(filterParams),
    },
  );
};
