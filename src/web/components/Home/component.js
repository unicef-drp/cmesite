import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import News from '../../components/News';
import DataMap from '../../components/DataMap';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.dark,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
});

export const Home = ({ classes }) => (
  <div className={classes.wrapper}>
    <Grid spacing={16} container>
      <Grid item xs={12} sm={12} md={4}>
        <News />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <DataMap isHome />
      </Grid>
    </Grid>
  </div>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Home);
