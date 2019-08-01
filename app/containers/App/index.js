import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useInjectSaga } from 'utils/injectSaga';
import { loadPosts as loadPostsCreator } from 'ducks/wordpress/actions';
import saga from 'ducks/wordpress/saga';
import { allRoutes, defaultRoute } from '../../routes';
import useStyles from './styles';
import './styles.css';

const App = ({ location, loadPosts }) => {
  useInjectSaga({ key: 'wordpress', saga });

  useEffect(() => {
    loadPosts('reports');
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet
        titleTemplate="%s - CME info - Child Mortality Estimates"
        defaultTitle="CME info - Child Mortality Estimates"
      >
        <meta name="description" content="CME info - Child Mortality Estimates" />
      </Helmet>
      <Header routePath={location.pathname} />
      <div className={classes.content}>
        <Switch>
          {R.map(
            route => (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ),
            allRoutes,
          )}
          {defaultRoute && <Route component={defaultRoute.component} />}
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  location: PropTypes.object.isRequired,
  loadPosts: PropTypes.func.isRequired,
};

const withConnect = connect(
  null,
  { loadPosts: loadPostsCreator },
);

export default compose(
  withConnect,
  withRouter,
)(App);
