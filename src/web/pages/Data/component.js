import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Data from '../../components/Data';

const style = () => ({
  root: {
    // sticky footer -> https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  wrapper: {
    // sticky footer -> https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
    flex: '1 0 auto',
  },
});

export const Page = ({ classes }) => (
  <div className={classes.root}>
    <Header routeName="data" />
    <div className={classes.wrapper}>
      <Data />
    </div>
    <Footer />
  </div>
);

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Page);
