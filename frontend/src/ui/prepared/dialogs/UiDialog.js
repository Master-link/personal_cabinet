import { PaperDialogComponent } from '../../../components/_helpers/MuiDialogs/PaperDialogComponent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import * as PropTypes from 'prop-types';

export const UiDialog = ({
  onCloseDialog,
  open = true,
  maxWidth = 'sm',
  fullWidth = true,
  dialogTitle = '',
  dialogContent = <></>,
  actions = <></>,
}) => (
  <Dialog
    open={open}
    onClose={onCloseDialog}
    maxWidth={maxWidth}
    fullWidth={fullWidth}
    aria-labelledby="dialog-title"
    PaperComponent={PaperDialogComponent}
  >
    <DialogTitle id="dialog-title">
      {dialogTitle}
    </DialogTitle>

    <DialogContent>{dialogContent}</DialogContent>

    <DialogActions className="m-3">{actions}</DialogActions>
  </Dialog>
);

UiDialog.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  open: PropTypes.bool,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  dialogTitle: PropTypes.string,
  dialogContent: PropTypes.node,
  actions: PropTypes.node,
};
