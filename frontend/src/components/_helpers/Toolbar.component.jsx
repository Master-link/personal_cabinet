import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export const Toolbar = ({ buttons }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" className={classes.paper}>
      <Grid container spacing={0}>
        {buttons}
      </Grid>
    </AppBar>
  );
};

Toolbar.propTypes = {
  buttons: PropTypes.node,
};
