import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

const style = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = ({ classes, isPage }) => (
  <Grid container justify="center" className={classnames(classes.root, { [classes.page]: isPage })}>
    <Grid item>
      <CircularProgress disableShrink size={80} thickness={1} />
    </Grid>
  </Grid>
);

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  isPage: PropTypes.bool,
};

export default withStyles(style)(Loader);
