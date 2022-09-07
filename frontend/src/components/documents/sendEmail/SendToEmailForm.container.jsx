import * as PropTypes from 'prop-types';
import { SentToEmailForm } from './SendToEmailForm';
import { postSendEmail } from '../../../services/document-http.service';
import SnackbarUtils from '../../../utilities/SnackbarUtils';
import { messageI18n } from '../../../services/intl/intl';
import { useIntl } from 'react-intl';
import { useState } from 'react';

const SentToEmailFormContainer = ({
  clientId,
  id,
  onCloseDialog,
}) => {
  const intl = useIntl();

  const [isDisabledSubmit, setIsDisabledSubmit] = useState(
    false,
  );

  const posdData = async (values) => {
    try {
      setIsDisabledSubmit(true);
      await postSendEmail(clientId, id, values);
      SnackbarUtils.success(
        messageI18n('save_success', 'Successfully saving'),
      );
    } catch (e) {
      SnackbarUtils.error(
        messageI18n(
          'send_error',
          'An Error on sending data',
        ),
      );
      console.error(e);
    } finally {
      setIsDisabledSubmit(false);
      onCloseDialog(false);
    }
  };

  return (
    <SentToEmailForm
      intl={intl}
      isDisabledSubmit={isDisabledSubmit}
      onSubmitForm={posdData}
    />
  );
};

SentToEmailFormContainer.propTypes = {
  clientId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};

export default SentToEmailFormContainer;
