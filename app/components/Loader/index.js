import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Wrapper from 'components/Wrapper';
import useStyles from './styles';

const Loader = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item>
        <CircularProgress disableShrink size={80} thickness={1} />
      </Grid>
    </Grid>
  );
};

export default Loader;
