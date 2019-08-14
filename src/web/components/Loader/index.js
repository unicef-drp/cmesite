import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

const style = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
});

const Loader = ({ classes }) => (
  <Grid container justify="center" className={classes.root}>
    <Grid item>
      <CircularProgress disableShrink size={80} thickness={1} />
    </Grid>
  </Grid>
);

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Loader);
