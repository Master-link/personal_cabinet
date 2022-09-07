import {
  ADMIN,
  CLIENT,
  DIRECTOR,
  EMPLOYEE,
  MANAGER,
  OBSERVER,
} from '../../constants/roles';
import { FormattedMessage } from 'react-intl';

export const roles = [
  {
    role: ADMIN,
    name: (
      <FormattedMessage
        id="role.admin"
        defaultMessage="Администратор"
      />
    ),
  },
  {
    role: CLIENT,
    name: (
      <FormattedMessage
        id="role.client"
        defaultMessage="Client"
      />
    ),
  },
  {
    role: DIRECTOR,
    name: (
      <FormattedMessage
        id="role.director"
        defaultMessage="Director"
      />
    ),
  },
  {
    role: EMPLOYEE,
    name: (
      <FormattedMessage
        id="role.employee"
        defaultMessage="Employee"
      />
    ),
  },
  {
    role: MANAGER,
    name: (
      <FormattedMessage
        id="role.manager"
        defaultMessage="Manager"
      />
    ),
  },
  {
    role: OBSERVER,
    name: (
      <FormattedMessage
        id="role.observer"
        defaultMessage="Observer"
      />
    ),
  },
];
