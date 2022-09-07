import { authenticationService } from 'src/_services/authentication.service';
import decode from 'jwt-decode';
import {
  ADMIN,
  CLIENT,
  DIRECTOR,
  EMPLOYEE,
  MANAGER,
  OBSERVER,
} from 'src/constants/roles';

export const generateLinkTr = (client_id, service_id) => {
  const currentUser =
    authenticationService.currentUserValue;
  const userinfo = decode(currentUser.token);

  switch (userinfo.roles[0]) {
    case CLIENT:
    case DIRECTOR:
    case EMPLOYEE:
      return `/services_client/show/${service_id}/subscriptions`;
    case MANAGER:
    case OBSERVER:
    case ADMIN:
      return `/clients/show/${client_id}/services/show/${service_id}/subscriptions`;
    default:
      break;
  }
};
