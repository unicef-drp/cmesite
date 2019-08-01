import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

/*
 * withStyles is used over convention here because styles Wrapper may be overriden.
 */

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wrapper);
