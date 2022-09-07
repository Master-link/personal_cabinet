import { getRequest } from '../_services/http-request.js';

// список документов
export const getCountries = async() => {

  return await getRequest( process.env.REACT_APP_BACKEND + '/countries')
    .then((response) => {
      return response;
    })
    .catch(error => {
      return error;
    });
}