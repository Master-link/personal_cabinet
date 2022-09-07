import {
  getRequest,
  patchRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from './generateFilterUrlParams';
import { messageI18n } from './intl/intl';

export const getNotifications = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/ntf/messages`,
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

export const patchNtfMessage = async (message_id) => {
  try {
    return await patchRequest( process.env.REACT_APP_BACKEND + 
      `/ntf/messages/${message_id}/read`,
    );
  } catch (error) {
    throw error;
  }
};
export const patchNtfMessageAll = async () => {
  try {
    return await patchRequest( process.env.REACT_APP_BACKEND + 
      `/ntf/messages/read_all`,
    );
  } catch (error) {
    throw error;
  }
};

export const getNtfCategories = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/ntf/categories`,
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
