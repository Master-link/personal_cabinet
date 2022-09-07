import { FormattedMessage } from 'react-intl';
import {
  setActive,
  setBreadcrumb,
} from 'src/redux/breadcrumbs/breadcrumbs.actions';
import { authenticationService } from 'src/_services/authentication.service';
import decode from 'jwt-decode';
import {
  ADMIN,
  MANAGER,
  OBSERVER,
} from 'src/constants/roles';

export const breadcrumbsIndexClaims = (dispatch) => {
  const currentUser =
    authenticationService.currentUserValue;
  const userinfo = decode(currentUser.token);

  userinfo.roles.map((role) => {
    switch (role) {
      case MANAGER:
      case OBSERVER:
      case ADMIN:
        dispatch(setActive('/claims'));
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
              name: (
                <FormattedMessage
                  id="claims_on_subscribes"
                  defaultMessage="Claims on subscribes"
                />
              ),
            },
          ]),
        );
        break;
      default:
        break;
    }
  });
};
