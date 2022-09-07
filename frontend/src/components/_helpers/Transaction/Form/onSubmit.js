import SnackbarUtils from 'src/utilities/SnackbarUtils';
import { messageI18n } from 'src/services/intl/intl';
import { addTransaction } from 'src/services/transaction-http.service';

export const onSubmit = (values) => {
  return addTransaction(values)
    .then(({ data }) => {
      SnackbarUtils.success(
        messageI18n('save_success', 'Successfully saving'),
      );

      return data.id;
    })
    .catch((e) => {
      SnackbarUtils.error(e.message);
    });
};
