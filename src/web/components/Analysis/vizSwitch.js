import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
});

const VizSwitch = ({ classes, types, setType, type }) => (
  <Toolbar disableGutters variant="dense" style={{ marginTop: -12 }}>
    {R.map(
      t => (
        <Button
          key={t}
          size="small"
          color={R.equals(type, t) ? 'primary' : null}
          classes={{ root: classes.button }}
          onClick={() => setType(t)}
        >
          {t}
        </Button>
      ),
      types,
    )}
  </Toolbar>
);

VizSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
  types: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
};

export default withStyles(styles)(VizSwitch);
