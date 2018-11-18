import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

const style = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
});

const Wrapper = ({ classes, children }) => (
  <Grid container justify="center" className={classes.root}>
    <Grid item xs={12} md={11} lg={9} xl={7}>
      {children}
    </Grid>
  </Grid>
);

Wrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withStyles(style)(Wrapper);
