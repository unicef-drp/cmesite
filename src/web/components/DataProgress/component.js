import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 2,
  },
});

const DataProgress = ({ classes }) => (
  <div className={classes.wrapper}>
    <CircularProgress />
  </div>
);

DataProgress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataProgress);
