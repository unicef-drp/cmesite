import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => ({
  typo: {
    color: theme.palette.primary.dark,
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.5,
  },
});

const DataTitle = ({ title, classes }) => (
  <Typography align="center" component="p" className={classes.typo}>
    {title}
  </Typography>
);

DataTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default withStyles(style)(DataTitle);
