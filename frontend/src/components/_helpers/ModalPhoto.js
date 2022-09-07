import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    maxWidth: '80%',
    maxHeight: '80%',
  },
  nested_div: {
    backgroundColor: 'white',
    display: 'flex',
    maxWidth: '100%',
  },
  nested_img: {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: '0 auto',
  },
}));

export const ModalPhoto = ({ img, onClose }) => {
  const classes = useStyles();
  const isOpenedDialog = img.length > 0;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpenedDialog}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpenedDialog}>
          <div className={classes.paper}>
            <div className={classes.nested_div}>
              <img src={img} alt={''} className={classes.nested_img} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

ModalPhoto.propTypes = {
  img: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
