import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataNotes = ({ notes, classes }) => (
  <div className={classes.wrapper}>
    <Typography align="center" component="p" className={classes.typo}>
      {notes}
    </Typography>
  </div>
);

DataNotes.propTypes = {
  classes: PropTypes.object.isRequired,
  notes: PropTypes.string,
};

export default withStyles(style)(DataNotes);
