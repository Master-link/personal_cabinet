import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { PermissionsUtility } from '../../../utilities/permissions.utility';
import { CREATE_DOCUMENT } from '../../../constants/permissions';
import CreateDocumentContainer from './CreateDocument.container';
import * as PropTypes from 'prop-types';

const AddDocumentDialog = ({
  afterCreateDocument,
  clientId,
}) => {
  const [open, setOpen] = useState(false);

  if (!PermissionsUtility(CREATE_DOCUMENT)) {
    return <></>;
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        className="mr-2"
      >
        <AddIcon />
        <FormattedMessage
          id="document.to_create"
          defaultMessage="Create document"
        />
      </Button>

      <Dialog
        key={`dialog${clientId}`}
        open={open}
        onClose={() => setOpen(false)}
        className="documentPopup"
        fullWidth
        maxWidth="sm"
      >
        <div className="m-20">
          <DialogTitle id="alert-dialog-title">
            <FormattedMessage
              id="document.creating"
              defaultMessage="Creating a document"
            />
          </DialogTitle>
          <DialogContent>
            <CreateDocumentContainer
              clientId={clientId}
              onClosePopup={() => setOpen(false)}
              afterCreateDocument={afterCreateDocument}
            />
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

AddDocumentDialog.propTypes = {
  afterCreateDocument: PropTypes.func.isRequired,
  clientId: PropTypes.string,
};
export default AddDocumentDialog;
