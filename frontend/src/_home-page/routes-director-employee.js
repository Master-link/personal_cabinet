import { DIRECTOR, EMPLOYEE } from '../constants/roles';

export const routes_director_employee = (role) =>
  [EMPLOYEE, DIRECTOR].includes(role);
