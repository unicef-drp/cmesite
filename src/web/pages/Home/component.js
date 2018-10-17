import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Page from '../../components/Page';
import Header from '../../components/Header';
import Splash from '../../components/Splash';
import News from '../../components/News';
import Datasets from '../../components/Datasets';
import { FeaturedReports } from '../../components/Reports';
import Footer from '../../components/Footer';
import HomeMap from '../../components/DataMap';

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

export const HomePage = ({ classes }) => (
  <Page>
    <Header routeName="home" />
    <Splash />
    <Grid container className={classes.wrapper}>
      <Grid item xs={12} sm={12} md={4}>
        <News />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <HomeMap />
      </Grid>
    </Grid>
    <Datasets />
    <FeaturedReports />
    <Footer />
  </Page>
);

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(HomePage);
