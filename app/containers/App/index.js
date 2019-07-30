import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import useStyles from './styles';
import { allRoutes, defaultRoute } from '../../routes';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from 'ducks/wordpress/saga';

const App = ({ location }) => {
  useInjectSaga({ key: 'wordpress', saga });

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
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          {R.map(route => (
            <Route
              key={route.name}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ), allRoutes)}
          {defaultRoute && <Route component={defaultRoute.component} />}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
)(App);
