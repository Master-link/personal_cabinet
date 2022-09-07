import axios from 'axios';
import { authHeader } from '../_helpers/auth-header';
import { authenticationService } from './authentication.service';
import decode from 'jwt-decode';
import { refreshUserToken } from '../services/user-http.service';
import { setUserToken } from '../redux/user/user.actions';
import store from '../redux/store';

const default_headers = (headers) => ({
  Accept: 'application/json' || headers['Accept'],
  'Content-Type':
    'application/json' || headers['Content-Type'],
  Authorization: `${authHeader()}`,
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
});

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${authHeader()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      timeout: 50000,
    };
    return config;
  },
  (error) => Promise.reject(error),
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const token =
        authenticationService.currentUserValue.token;
      const userinfo = decode(token);
      try {
        const { data } = await refreshUserToken({
          user_id: userinfo.user_id,
          token: token,
        });

        localStorage.setItem(
          'currentUser',
          JSON.stringify(data),
        );
        localStorage.setItem('currentToken', data.token);
        const { dispatch } = store;
        dispatch(setUserToken(data.token));
      } catch (e) {}

      return axiosApiInstance(originalRequest);
    }

    const url = new URL(originalRequest.url);
    if (url.pathname === '/users/refresh_token') {
      authenticationService.logout();
    }
    return Promise.reject(error);
  },
);

// GET
export const getRequest = (url, params, headers = []) =>
  axiosApiInstance.get(url, {
    headers: default_headers(headers),
    params: params || {},
    timeout: 50000,
  });

// GET pdf file
export const getPdfRequest = (url, params) => {
  const hdrs = {
    Accept: 'application/pdf',
    'Content-Type': 'application/pdf',
    Authorization: `${authHeader()}`,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  };
  return axiosApiInstance.get(url, {
    headers: hdrs,
    params: params || {},
    timeout: 500000,
    responseType: 'blob',
  });
};

// GET
export const getPdf = (url, params, headers) => {
  const hdrs = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${authHeader()}`,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  };
  return axiosApiInstance.get(url, {
    headers: hdrs || headers,
    responseType: 'blob',
    params: params || {},
    timeout: 50000,
  });
};

export const getXlsxRequest = (url, params) => {
  const hdrs = {
    Accept: 'application/xlsx',
    'Content-Type': 'application/xlsx',
    Authorization: `${authHeader()}`,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  };
  return axiosApiInstance.get(url, {
    headers: hdrs,
    params: params || {},
    timeout: 500000,
    responseType: 'blob',
  });
};

// GET
export const getXlsx = (url, params, headers) => {
  const hdrs = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${authHeader()}`,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  };
  return axiosApiInstance.get(url, {
    headers: hdrs || headers,
    responseType: 'arraybuffer',
    params: params || {},
    timeout: 50000,
  });
};

// POST
export const postRequest = (url, body, headers = []) =>
  axiosApiInstance.post(url, body, {
    headers: default_headers(headers),
    timeout: 50000,
  });

// PUT
export const putRequest = (url, body, headers = []) =>
  axiosApiInstance.put(url, body, {
    headers: default_headers(headers),
    timeout: 50000,
  });

// PATCH
export const patchRequest = (url, body, headers = []) =>
  axiosApiInstance.patch(url, body, {
    headers: default_headers(headers),
    timeout: 50000,
  });

// DELETE
export const deleteRequest = (url, headers = []) =>
  axiosApiInstance.delete(url, {
    headers: default_headers(headers),
    timeout: 50000,
  });
