import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 16,
  },
});

export const Page = ({ classes, children }) => (
  <div className={classes.wrapper}>{children}</div>
);

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withStyles(style)(Page);
