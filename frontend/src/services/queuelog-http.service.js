import {
  deleteRequest,
  getRequest,
  postRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from './generateFilterUrlParams';
import { messageI18n } from './intl/intl';

export const getChangeTariffsQueue = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/queuelogs/`,
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

export const postCreateChangeTariff = async (data) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      `/queuelogs/create_change_tariff`,
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const deleteQueuelog = async (id) => {
  try {
    return await deleteRequest( process.env.REACT_APP_BACKEND + 
      `/queuelogs/${id}`,
    );
  } catch (error) {
    throw error;
  }
};
