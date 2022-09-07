import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { ButtonUI } from 'src/ui/prepared/buttons';

export const DialogForm = ({
  title,
  isOpen,
  handleClose,
  maxWidth = 'md',
  isFullWidth = true,
  bodyCss = 'p-20',
  children,
}) => {
  const intl = useIntl();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={isFullWidth}
      maxWidth={maxWidth}
      aria-labelledby="form-dialog-title"
    >
      <div className={bodyCss}>
        <DialogTitle id="form-dialog-title">
          {title}
        </DialogTitle>

        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <ButtonUI
            variant={'outlined'}
            onClick={handleClose}
            text={intl.formatMessage({
              id: 'cancel',
              defaultMessage: 'Cancel',
            })}
          />
          <ButtonUI
            color={'primary'}
            variant={'contained'}
            onClick={() => {}}
            text={intl.formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          />
        </DialogActions>
      </div>
    </Dialog>
  );
};
