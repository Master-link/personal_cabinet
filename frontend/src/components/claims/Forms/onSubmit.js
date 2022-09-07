import SnackbarUtils from 'src/utilities/SnackbarUtils';
import { addClaim } from 'src/services/claim-http.service';

export const onSubmit = (values) => {
  return addClaim(values)
    .then(({ data }) => {
      SnackbarUtils.success(data.message);
      return data.id;
    })
    .catch((e) => {
      SnackbarUtils.error(e.message);
    });
};
