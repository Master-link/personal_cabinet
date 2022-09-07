import {
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
} from '../_services/http-request.js';
import { messageI18n } from './intl/intl';
import { generateFilterUrlParams } from './generateFilterUrlParams';

// список менеджеров
export const getManagers = async () => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/users/managers',
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

// список юзеров
export const getUsers = async (
  getParams = {},
  filterParams = {},
) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      '/users',
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

// получить 1 юзера
export const getUser = async (id, clientId) => {
  try {
    return await getRequest( process.env.REACT_APP_BACKEND + 
      `/users/${id}?client_id=${clientId}`,
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

// обновить пароль
export const putPassword = async (data) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 

        '/password/change_password',
      data,
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

// обновить пароль
export const putNewPassword = async (data) => {
  try {
    return await putRequest( process.env.REACT_APP_BACKEND + 

        '/password/set_new_password',
      data,
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

// редактирование пользователя
export const putUser = async (id, body, clientId) => {
  try {
    const queryParams = clientId
      ? `client_id=${clientId}`
      : '';
    return await putRequest( process.env.REACT_APP_BACKEND + 
      `/users/${id}?${queryParams}`,
      body,
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

// создание пользователя
export const postCreateUser = async (body, clientId) => {
  try {
    const queryParams = clientId
      ? `client_id=${clientId}`
      : '';
    return await postRequest( process.env.REACT_APP_BACKEND + 
      `/users/create_user?${queryParams}`,
      body,
    );
  } catch (e) {
    throw e;
  }
};

export const refreshUserToken = async (body) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 

        '/users/refresh_token',
      body,
    );
  } catch (e) {
    throw e;
  }
};

// сброс пароля под админом
export const resetUserPassword = async (id) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 

        '/users/' +
        id +
        '/reset_password',
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

export const deleteUser = async (id) => {
  try {
    return await deleteRequest( process.env.REACT_APP_BACKEND + 
      `/users/${id}`,
    );
  } catch {
    throw new Error(
      `${messageI18n(
        'back.error_getting_data',
        'Error deleting item',
      )}`,
    );
  }
};

export const passwordResetPost = async (body) => {
  try {
    return await postRequest( process.env.REACT_APP_BACKEND + 
      `/password/reset`,
      body,
    );
  } catch (e) {
    throw e;
  }
};
