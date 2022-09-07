import { CurrentUser } from './current-user.utility';
import * as C from '../constants/permissions';
import {
  CREATE_USER,
  MANAGE_USER,
} from '../constants/permissions';

// Утилита разрешений на показ элементов
export const PermissionsUtility = (action) => {
  const user = CurrentUser();

  // для каждой роли перечислять через запятую, или C.ALL если разрешить все
  //
  const credentials = {
    admin: [C.ALL],
    client: [C.ALL, C.ACTIVATE_MY_QUESTION],
    director: [
      C.BUY_TIME,
      C.CREATE_DOCUMENT,
      C.ACTIVATE_MY_QUESTION,
      C.ADD_CLAIM_SUBSCRIPTION,
      C.CREATE_USER,
    ],
    employee: [C.CREATE_DOCUMENT],
    manager: [
      C.ALL,
      C.ACTIVATE_QUESTION,
      C.MANAGE_USER,
      C.CREATE_USER,
    ],
    observer: [],
    support: [
      C.ACTIVATE_QUESTION,
      C.EDIT_ANSWER,
      C.HIDE_ANSWER,
    ],
  };

  try {
    const allow = user.all_roles.filter((role) => {
      if (
        [
          'admin',
          'client',
          'director',
          'employee',
          'manager',
          'observer',
          'support',
        ].includes(role)
      ) {
        return credentials[role].includes(action);
      }
    });
    return (
      allow.length > 0 ||
      credentials[user.role].includes(C.ALL)
    );
  } catch (e) {
    console.error('permissions ', e);
  }

  return false;
};
