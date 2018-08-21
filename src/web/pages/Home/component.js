import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../../components/Header';
import Splash from '../../components/Splash';
import News from '../../components/News';
import Datasets from '../../components/Datasets';
import { FeaturedReports } from '../../components/Reports';
import Footer from '../../components/Footer';

// temp
import Avatar from '@material-ui/core/Avatar';
import BlurOnIcon from '@material-ui/icons/BlurOn';

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

export const Page = ({ classes }) => (
  <React.Fragment>
    <Header routeName="home" />
    <Splash />
    <Grid container className={classes.wrapper}>
      <Grid item xs={12} sm={12} md={4}>
        <News />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <div
          style={{
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar>
            <BlurOnIcon />
          </Avatar>
        </div>
      </Grid>
    </Grid>
    <Datasets />
    <FeaturedReports />
    <Footer />
  </React.Fragment>
);

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Page);
