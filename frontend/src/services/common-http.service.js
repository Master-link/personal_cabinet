import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../_services/http-request';
import { generateFilterUrlParams } from './generateFilterUrlParams';
import { messageI18n } from './intl/intl';

export const getRequests = async (
  url,
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `${url}`,
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

export const postRequests = async (url, data) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      `${url}`,
      data,
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

export const readRequests = async (url) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `${url}`,
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

export const updateRequests = async (url, data) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 
      `${url}`,
      data,
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

export const deleteRequests = async (url) => {
  try {
    return await deleteRequest( process.env.REACT_APP_BACKEND + 
      `${url}`,
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
