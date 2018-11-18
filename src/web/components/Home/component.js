import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import News from '../../components/News';
import DataMap from '../../components/DataMap';
import Wrapper from '../Wrapper';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.dark,
  },
});

export const Home = ({ classes }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Grid spacing={32} container>
      <Grid item xs={12} md={4}>
        <News />
      </Grid>
      <Grid item xs={12} md={8}>
        <DataMap isHome />
      </Grid>
    </Grid>
  </Wrapper>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Home);
