import {
  ADMIN,
  CLIENT,
  DIRECTOR,
  EMPLOYEE,
  MANAGER,
  OBSERVER,
} from '../constants/roles';

export const routes_like_admin = (role) =>
  [ADMIN, MANAGER, OBSERVER].includes(role);

export const super_primary_roles = (role) =>
  [ADMIN, MANAGER].includes(role);

export const primary_roles = (role) =>
  [ADMIN, MANAGER, OBSERVER].includes(role);

export const seper_secondary_roles = (role) =>
  [CLIENT, DIRECTOR].includes(role);

export const secondary_roles = (role) =>
  [CLIENT, DIRECTOR, EMPLOYEE].includes(role);
