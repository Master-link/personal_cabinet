import { getRequest } from '../_services/http-request.js';
import { messageI18n } from './intl/intl';
import { generateFilterUrlParams } from './generateFilterUrlParams';

export const getNomenclatures = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/nomenclatures/search_autocomplete`,
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
