import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 16,
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing.unit * 7,
    },
    // sticky footer -> https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
});

export const Page = ({ classes, children }) => <div className={classes.root}>{children}</div>;

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withStyles(style)(Page);
