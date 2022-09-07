import {
  getRequest,
  putRequest,
} from '../_services/http-request.js';

export const getAlerts = async (
  page,
  sort,
  order,
  limit,
  client_id,
) => {
  const params = new URLSearchParams({
    page,
    sort,
    order,
    limit,
  });

  if (client_id !== undefined && client_id !== null) {
    params.append('filter[client_id]', client_id);
  }
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/alert_settings`,
      params,
    );
  } catch (error) {
    throw error;
  }
};

export const putAlert = async (id, body) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 
      `/alert_settings/${id}`,
      body,
    );
  } catch (error) {
    throw error;
  }
};
