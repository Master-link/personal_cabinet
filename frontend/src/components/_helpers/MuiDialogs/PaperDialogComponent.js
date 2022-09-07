import Draggable from 'react-draggable';
import { Paper } from '@material-ui/core';
import React from 'react';
import * as PropTypes from 'prop-types';

export const PaperDialogComponent = ({
  handleId = '#dialog-title',
  ...props
}) => {
  return (
    <Draggable
      handle={handleId}
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

PaperDialogComponent.propTypes = {
  handleId: PropTypes.string,
};
