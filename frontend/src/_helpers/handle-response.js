import { authenticationService } from '../_services/authentication.service';
import { useSnackbar } from 'notistack';

export function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // if ([401, 403].indexOf(response.status) !== -1) {
      if ([401].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        //authenticationService.logout();
        // window.location.reload(true);
        authenticationService.logout();
        window.location.reload(true);
        // const { enqueueSnackbar } = useSnackbar();
        // enqueueSnackbar( "Нет прав для ",  {variant: 'error'} );
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}