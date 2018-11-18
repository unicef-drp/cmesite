import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const style = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,

    //sticky footer -> https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
    flex: '1 0 auto',
  },
});

const PageContent = ({ classes, children }) => <div className={classes.root}>{children}</div>;

PageContent.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withStyles(style)(PageContent);
