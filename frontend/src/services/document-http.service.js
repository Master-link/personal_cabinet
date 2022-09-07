import {
  getRequest,
  getPdfRequest,
  postRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from './generateFilterUrlParams';
import { messageI18n } from './intl/intl';

export const getDocuments = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/documents`,
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

export const getClientDocuments = async (
  client_id,
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/clients/${client_id}/documents/client_index`,
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

export const getPdf = async (client_id, id) => {
  try {
    return await getPdfRequest( process.env.REACT_APP_BACKEND + 
      `/clients/${client_id}/documents/${id}/pdf`,
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

export const getHtml = async (client_id, id) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/clients/${client_id}/documents/${id}/html`,
      {},
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

export const postSendEmail = async (clientId, id, body) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      `/clients/${clientId}/documents/${id}/send_email`,
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

export const postDocument = async (id, body) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      `/documents`,
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
