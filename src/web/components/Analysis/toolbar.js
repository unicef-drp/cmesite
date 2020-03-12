import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import MUIToolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  button: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
});

const Toolbar = ({ classes, indicatorValues }) => (
  <MUIToolbar disableGutters className={classes.root}>
    {R.map(
      ({ id, label }) => (
        <Button
          key={id}
          //color={R.equals(indicatorValueId, id) ? 'primary' : null}
          classes={{ root: classes.button }}
          //onClick={() => setIndicatorValueId(id)}
        >
          {label}
        </Button>
      ),
      indicatorValues,
    )}
  </MUIToolbar>
);

Toolbar.propTypes = {
  indicatorValues: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Toolbar);
