import {
  getRequest,
  postRequest,
} from '../_services/http-request.js';
import { messageI18n } from './intl/intl';
import { generateFilterUrlParams } from './generateFilterUrlParams';

export const getClaims = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/claims',
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

export const addClaim = async (data) =>
  await postRequest( process.env.REACT_APP_BACKEND + 
    '/claims/',
    data,
  );

export const getNewClaims = async () =>
  await getRequest( process.env.REACT_APP_BACKEND + 
    '/claims/count_new',
  );

export const getClaim = async (id) =>
  await getRequest( process.env.REACT_APP_BACKEND + 
    `/claims/${id}`,
  );

export const approveClaim = async (id) =>
  await getRequest( process.env.REACT_APP_BACKEND + 
    `/claims/${id}/approve`,
  );

export const refuseClaim = async (id) =>
  await getRequest( process.env.REACT_APP_BACKEND + 
    `/claims/${id}/refuse`,
  );
