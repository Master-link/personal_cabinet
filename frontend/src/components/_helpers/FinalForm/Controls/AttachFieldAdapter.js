import * as PropTypes from 'prop-types';
import './AttachFieldAdapter.scss';
import React, { useState } from 'react';
import ImageIcon from '@material-ui/icons/Image';
import { Chip, Grid } from '@material-ui/core';
import SnackbarUtils from '../../../../utilities/SnackbarUtils';

const build_array_files = (object_files) =>
  Object.keys(object_files).reduce(
    (acc, key) => [...acc, object_files[key]],
    [],
  );

const ShowPreparedImg = ({ img, onRemove }) => (
  <Grid item>
    <Chip
      icon={<ImageIcon />}
      label={img.name}
      onDelete={onRemove}
      color="secondary"
      className="m-1"
    />
  </Grid>
);

const isExceedLimit = (files, maxFileSizes) =>
  Object.keys(files).reduce(
    (acc, key) => acc + files[key].size,
    0,
  ) > maxFileSizes;

export const AttachFieldAdapter = ({
  accept = 'image/*',
  files = [],
  helperText = '',
  input,
  isMultiple = true,
  maxFileSizes = 2000000,
  messageOnMaxSizeFiles,
  onChange,
  onRemoveFile = () => {},
}) => {
  const [preparedImages, setPreparedImages] = useState(
    files,
  );

  const addFile = (event) => {
    const {
      target: { files },
    } = event;

    if (isExceedLimit(files, maxFileSizes)) {
      event.preventDefault();
      SnackbarUtils.warning(
        messageOnMaxSizeFiles ||
          `Maximum files upload size ${maxFileSizes} Bytes`,
      );
      return;
    }
    const filteredFiles = build_array_files(
      event.target.files,
    );
    setPreparedImages([
      ...preparedImages,
      ...filteredFiles,
    ]);
    onChange(filteredFiles);
  };

  const removeFile = (i) => {
    const filteredFiles = preparedImages.filter(
      (item, index) => index !== i,
    );
    setPreparedImages(filteredFiles);
    onRemoveFile(filteredFiles);
  };
  return (
    <>
      <div className="attach_file_adapter">
        <label
          htmlFor="upoad-image-input"
          className="w_100 flex pointer"
        >
          <div>{helperText}</div>
        </label>
        <div className="flex pb-2">
          {preparedImages.map((img, i) => (
            <Grid
              item
              alignContent={'center'}
              alignItems={'center'}
            >
              <ShowPreparedImg
                key={i}
                img={img}
                onRemove={() => {
                  removeFile(i);
                }}
              />
            </Grid>
          ))}
        </div>
      </div>

      <input
        name={input.name}
        accept={accept}
        className="hidden"
        id="upoad-image-input"
        type="file"
        onChange={addFile}
        multiple={isMultiple}
      />
    </>
  );
};

AttachFieldAdapter.propTypes = {
  accept: PropTypes.string,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      lastModified: PropTypes.number.isRequired,
      lastModifiedDate: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      webkitRelativePath: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  helperText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isMultiple: PropTypes.bool,
  maxFileSizes: PropTypes.number,
  messageOnMaxSizeFiles: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRemoveFile: PropTypes.func,
};
