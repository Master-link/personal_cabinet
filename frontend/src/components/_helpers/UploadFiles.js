import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid } from '@material-ui/core';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  label: {
    marginBottom: '0px',
  },
}));

const build_array_files = (object_files) =>
  Object.keys(object_files).reduce(
    (acc, key) => [...acc, object_files[key]],
    [],
  );

export const UploadButtons = ({
  id,
  setPreparedImages,
}) => {
  const classes = useStyles();

  const selectFile = (event) =>
    setPreparedImages(
      build_array_files(event.target.files),
    );

  return (
    <Grid
      container
      className={classes.root}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Grid
        item
        alignContent={'center'}
        alignItems={'center'}
        className={'upload_btn'}
      >
        <input
          accept="image/*"
          className={classes.input}
          id={`upoad-button-${id}`}
          type="file"
          multiple
          onChange={selectFile}
        />
        <label
          htmlFor={`upoad-button-${id}`}
          className={classes.label}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <AddCircleIcon />
          </IconButton>
        </label>
      </Grid>
    </Grid>
  );
};

UploadButtons.propTypes = {
  id: PropTypes.number.isRequired,
  model: PropTypes.string.isRequired,
  models: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
  setPreparedImages: PropTypes.func.isRequired,
};
