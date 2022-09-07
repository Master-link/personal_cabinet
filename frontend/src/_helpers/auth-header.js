import { authenticationService } from '../_services/authentication.service';

export const authHeader = () => {
  const currentUser = authenticationService.currentUserValue;
  if (currentUser ) {
    return `Bearer ${currentUser.token}`;
  } else {
    return '';
  }
}