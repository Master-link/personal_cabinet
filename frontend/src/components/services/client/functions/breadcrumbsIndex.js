import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from 'src/redux/breadcrumbs/breadcrumbs.actions';
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

export const breadcrumbsIndex = (client, dispatch) => {
  const currentUser =
    authenticationService.currentUserValue;
  const userinfo = decode(currentUser.token);

  switch (userinfo.roles[0]) {
    case CLIENT:
    case DIRECTOR:
    case EMPLOYEE:
      dispatch(setActive('/'));
      dispatch(
        setBreadcrumb([
          {
            name: (
              <FormattedMessage
                id="main"
                defaultMessage="Main"
              />
            ),
            to: '/services_client',
          },
          {
            name: (
              <FormattedMessage
                id="services"
                defaultMessage="Services"
              />
            ),
          },
        ]),
      );
      break;
    case MANAGER:
    case OBSERVER:
    case ADMIN:
      dispatch(setActive('/'));
      dispatch(
        setBreadcrumb([
          {
            name: (
              <FormattedMessage
                id="main"
                defaultMessage="Main page"
              />
            ),
            to: '/',
          },
          {
            name: `${client.name} ID ${client.crm.crm}`,
            to: `/clients/edit/${client.id}`,
          },
          {
            name: (
              <FormattedMessage
                id="services"
                defaultMessage="Services"
              />
            ),
          },
        ]),
      );
      break;
    default:
      break;
  }
};
