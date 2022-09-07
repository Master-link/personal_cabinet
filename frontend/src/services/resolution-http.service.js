import {
  getRequest,
  putRequest,
} from '../_services/http-request.js';
import { generateFilterUrlParams } from './generateFilterUrlParams';
import { messageI18n } from './intl/intl';

export const getResolutions = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/resolutions',
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

export const putResolutions = async (values) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 

        '/resolutions/update_resolutions_for_role',
      values,
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
