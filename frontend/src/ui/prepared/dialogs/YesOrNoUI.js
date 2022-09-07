import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import * as PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const YesOrNoUI = ({
  description = '',
  onCancel = () => {},
  onConfirm = () => {},
  isOpen = false,
}) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    onCancel();
    setOpen(false);
  };

  const handleYes = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {intl.formatMessage({
              id: 'no',
              defaultMessage: 'No',
            })}
          </Button>
          <Button onClick={handleYes} color="primary">
            {intl.formatMessage({
              id: 'yes',
              defaultMessage: 'Yes',
            })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

YesOrNoUI.propTypes = {
  description: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  isOpen: PropTypes.bool,
};
