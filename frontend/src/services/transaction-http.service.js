import {
  getRequest,
  deleteRequest,
  postRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from './generateFilterUrlParams';
import { messageI18n } from './intl/intl';

export const getTransactions = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/transactions`,
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

export const addTransaction = async (data) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      '/transactions/',
      data,
    );
  } catch (error) {
    throw error;
  }
};
