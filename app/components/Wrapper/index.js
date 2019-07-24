import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';

const Wrapper = ({ children }) => {
  const classes = useStyles();
  
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} md={11} lg={9} xl={7}>
        {children}
      </Grid>
    </Grid>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node,
};

export default Wrapper;
