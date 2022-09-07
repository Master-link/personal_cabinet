import { getRequest } from '../_services/http-request.js';

export const getOperators = async () => {
  return await getRequest( process.env.REACT_APP_BACKEND + 

      '/operators?filter[kind]=1',
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCallbotOperators = async () => {
  return await getRequest( process.env.REACT_APP_BACKEND + 

      '/operators?filter[kind]=2',
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
