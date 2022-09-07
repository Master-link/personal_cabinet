import { getRequest } from '../_services/http-request.js';
import { messageI18n } from './intl/intl';
import { generateFilterUrlParams } from './generateFilterUrlParams';

export const getLegalEntities = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/legal_entities/search`,
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
