import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../../components/Header';
import Splash from '../../components/Splash';
import News from '../../components/News';
import Datasets from '../../components/Datasets';
import Reports from '../../components/Reports';
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

export const Home = ({ classes }) => (
  <React.Fragment>
    <Header />
    <Splash />
    <Grid container className={classes.wrapper}>
      <Grid item xs={12} sm={6} md={3}>
        <News />
      </Grid>
      <Grid item xs={12} sm={6} md={9}>
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
    <Reports />
    <Footer />
  </React.Fragment>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Home);
