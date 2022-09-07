import { getRequest } from '../_services/http-request.js';

export const getCrmEmployeeManagers = async () => {
  const params = new URLSearchParams();

  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/employees/managers',
      { _t: new Date().getTime(), ...params },
    );
  } catch (error) {
    throw error;
  }
};
