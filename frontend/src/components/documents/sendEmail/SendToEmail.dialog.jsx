import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import * as PropTypes from 'prop-types';
import SentToEmailFormContainer from './SendToEmailForm.container';

const SendToEmailDialog = ({
  clientId,
  id,
  onCloseDialog,
}) => (
  <Dialog
    key={`dialog${id}`}
    open
    onClose={() => onCloseDialog(false)}
    className="documentPopup"
    fullWidth
    maxWidth="sm"
  >
    <div className="m-20">
      <DialogTitle id="document-dialog-title">
        <FormattedMessage
          id="document.send_document_to_email"
          defaultMessage="Send document to email"
        />
      </DialogTitle>
      <DialogContent>
        <SentToEmailFormContainer
          clientId={clientId}
          id={id}
          onCloseDialog={onCloseDialog}
        />
      </DialogContent>
    </div>
  </Dialog>
);

SendToEmailDialog.propTypes = {
  clientId: PropTypes.string.isRequired,
  id: PropTypes.string,
  onCloseDialog: PropTypes.func,
};

export default SendToEmailDialog;
