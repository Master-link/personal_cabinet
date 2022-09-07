import {
  getRequest,
  deleteRequest,
  putRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from 'src/services/generateFilterUrlParams';
import { messageI18n } from './intl/intl';

export const getClients = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/clients',
      {
        ...getParams,
        ...generateFilterUrlParams(filterParams),
        _t: new Date().getTime(),
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

export const getClient = async (id) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/clients/' + id,
    );
  } catch (error) {
    throw error;
  }
};

export const getClientByCrmId = async (crm_id) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        '/clients/crm_id/' +
        crm_id,
    );
  } catch (error) {
    throw error;
  }
};

export const putClient = async (id, data) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 
      '/clients/' + id,
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const searchClient = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/clients/search',
      {
        ...getParams,
        ...generateFilterUrlParams(filterParams),
      },
    );
  } catch (error) {
    throw error;
  }
};

export const getClientService = async (
  client_id,
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 

        `/clients/${client_id}/services`,
      {
        ...getParams,
        ...generateFilterUrlParams(filterParams),
        _t: new Date().getTime(),
      },
    );
  } catch (error) {
    throw error;
  }
};
