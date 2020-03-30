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

const Toolbar = ({ classes, values, valueId, setValueId }) => (
  <MUIToolbar disableGutters className={classes.root}>
    {R.map(
      ({ id, label }) => (
        <Button
          key={id}
          color={R.equals(valueId, id) ? 'primary' : null}
          variant={R.equals(valueId, id) ? 'outlined' : null}
          classes={{ root: classes.button }}
          onClick={() => setValueId(id)}
        >
          {label}
        </Button>
      ),
      values,
    )}
  </MUIToolbar>
);

Toolbar.propTypes = {
  values: PropTypes.array.isRequired,
  valueId: PropTypes.string.isRequired,
  setValueId: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Toolbar);
