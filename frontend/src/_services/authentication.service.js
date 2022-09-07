import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers/handle-response';
import { authHeader } from '../_helpers/auth-header';
import decode from 'jwt-decode';
import store from '../redux/store';
import { setUserToken } from '../redux/user/user.actions';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser')),
);

const currentUserToken = new BehaviorSubject(
  localStorage.getItem('currentToken'),
);
const currentClient = new BehaviorSubject(
  localStorage.getItem('currentClient'),
);

export const keepComparedLastLogins = (userId) => {
  const lastUserId = parseInt(
    localStorage.getItem('lastUserId'),
  );

  localStorage.setItem(
    'anotherUserId',
    lastUserId !== userId,
  );
  localStorage.setItem('lastUserId', userId);
};

export const authenticationService = {
  login,
  clientFetch,
  logout,
  loginAsUser,
  currentUser: currentUserSubject.asObservable(),
  currentToken: currentUserToken.asObservable(),
  currentClient: currentClient.asObservable(),
  get currentUserValue() {
    return JSON.parse(localStorage.getItem('currentUser'));
  },
};

// запрос на получение клиента, для юзера
async function clientFetch(user_id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(
        'currentToken',
      )}`,
    },
  };

  return await fetch(
      process.env.REACT_APP_BACKEND + `/users/${user_id}/crm`,
    requestOptions,
  )
    .then(handleResponse)
    .then((client) => {
      currentClient.next(client);
      localStorage.setItem(
        'currentClient',
        JSON.stringify(client),
      );
      return client;
    });
}

// войти под пользователем
function loginAsUser(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authHeader()}`,
    },
  };

  return fetch(
      process.env.REACT_APP_BACKEND + `/auth/login_as_user/${id}`,
    requestOptions,
  )
    .then(handleResponse)
    .then((user) => {
      currentUserSubject.next(user);
      currentUserToken.next(user);
      localStorage.setItem(
        'currentUser',
        JSON.stringify(user),
      );
      localStorage.setItem('currentToken', user.token);
      const userinfo = decode(user.token);
      keepComparedLastLogins(userinfo.user_id);
      return user;
    });
}

// запрос на логин
function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(
      process.env.REACT_APP_BACKEND + `/auth/login`,
    requestOptions,
  )
    .then(handleResponse)
    .then((user) => {
      currentUserSubject.next(user);
      currentUserToken.next(user);
      localStorage.setItem(
        'currentUser',
        JSON.stringify(user),
      );
      localStorage.setItem('currentToken', user.token);
      const userinfo = decode(user.token);
      keepComparedLastLogins(userinfo.user_id);
      return user;
    });
}

function logout() {
  const { dispatch } = store;
  dispatch(setUserToken(null));
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentToken');
  localStorage.removeItem('currentClient');
  currentUserSubject.next(null);
  currentUserToken.next(null);
  currentUserToken.next(null);
}
